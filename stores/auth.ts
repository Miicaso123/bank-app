import { defineStore } from 'pinia';

export interface User {
  name: string;
  phonenumber: string;
  token: string; 
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    initAuth() {
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (
            parsed &&
            typeof parsed.name === 'string' &&
            typeof parsed.phonenumber === 'string' &&
            typeof parsed.token === 'string'
          ) {
            this.user = parsed;
          } else {
            console.warn('Invalid auth_user format, clearing...');
            localStorage.removeItem('auth_user');
          }
        } catch (error) {
          console.error('Failed to parse auth_user:', error);
          localStorage.removeItem('auth_user');
        }
      }
    },

    register(name: string, phonenumber: string, password: string) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      const exists = users.find((u) => u.phonenumber === phonenumber);
      if (exists) throw new Error('User already exists');

      const token = btoa(password); 

      const newUser: User = { name, phonenumber, token };
      users.push(newUser);

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      this.user = newUser;
    },

    login(phonenumber: string, password: string) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const token = btoa(password); 

      const found = users.find((u) => u.phonenumber === phonenumber && u.token === token);

      if (!found) throw new Error('Invalid phone or password');

      localStorage.setItem('auth_user', JSON.stringify(found));
      this.user = found;
    },

    logout() {
      this.user = null;
      localStorage.removeItem('auth_user');
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    userName: (state) => state.user?.name || 'Guest',
  },
});
