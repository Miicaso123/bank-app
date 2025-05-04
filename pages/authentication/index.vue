<template>
  <div class="app">
    <div v-if="isMobile" class="page">
      <div v-if="isLogin" class="login">
        <header class="header">
          <div><img src="/images/arrow.png" alt="arrow" class="arrow" /></div>
        <div @click="backToHome"><p>Sign in</p></div>
        </header>

        <div class="wrapper">
          <div class="content">
            <div class="content-welcome">
              <h2>Welcome Back</h2>
              <p>Hello there, sign in to continue</p>
            </div>
            <div class="content-image">
              <img src="/images/login1.svg" alt="login1" class="login-img" />
            </div>
            <form @submit.prevent="handleLogin" class="form">
              <input v-model="loginForm.phonenumber" type="number" placeholder="Text input" required />
              <input v-model="loginForm.password" type="password" placeholder="Password" required />
              <div class="content-forgot">
                <p>Forgot your password ?</p>
              </div>
              <button class="button" type="submit">Sign in</button>
            </form>
            <div class="content-image">
              <img src="/images/fingerprint.svg" alt="fingerprint" class="fingerprint" />
            </div>
            <div class="content-signup">
              <p>Don't have an account? <span @click="toggleLogin">Sign Up</span></p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="register">
        <header class="header">
          <div><img src="/images/arrow.png" alt="arrow" class="arrow" /></div>
          <div @click="backToHome"><p>Sign up</p></div>
        </header>

        <div class="wrapper">
          <div class="content">
            <div class="content-welcome">
              <h2>Welcome to us,</h2>
              <p>Hello there, create New account</p>
            </div>
            <div class="content-image">
              <img src="/images/register1.svg" alt="register1" class="login-img" />
            </div>
            <form @submit.prevent="handleRegister" class="form">
              <input v-model="registerForm.name" type="text" placeholder="Name" required />
              <input v-model="registerForm.phonenumber" type="number" placeholder="Text input" required />
              <input
                v-model="registerForm.password"
                type="password"
                placeholder="Password"
                required
              />
              <div class="content-term">
                <input type="checkbox" v-model="registerForm.terms" />
                <p>By creating an account, you agree to our <span>Terms & Conditions</span></p>
              </div>
              <button class="button" type="submit">Sign up</button>
            </form>
            <div class="content-signup">
              <p>Have an account? <span @click="toggleLogin">Sign In</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="nopage">
      <NoPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const isLogin = ref<boolean>(true);
const isMobile = ref<boolean>(true);

const loginForm = reactive({
  phonenumber: '',
  password: '',
});

const registerForm = reactive({
  name: '',
  phonenumber: '',
  password: '',
  terms: false,
});

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 500;
};

const toggleLogin = () => {
  isLogin.value = !isLogin.value;
};

const backToHome = () => {
  router.push('/');
};

const handleLogin = async () => {
  try {
    authStore.login(loginForm.phonenumber, loginForm.password);
    router.push('/');
  } catch (error) {
    console.log('Login failed:', error);
  }
};

const handleRegister = async () => {
  if (!registerForm.terms) {
    alert('Please accept terms and conditions');
    return;
  }
  try {
    authStore.register(registerForm.name, registerForm.phonenumber, registerForm.password);
    router.push('/');
  } catch (error) {
    console.log('Registration failed:', error);
  }
};

onMounted(() => {
  checkScreen();
  window.addEventListener('resize', checkScreen);
  authStore.initAuth();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen);
});
</script>

<style scoped>
.page {
  background: #3629b7;
  height: 30vh;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #3629b7;
  padding-top: 16px;
  padding-left: 16px;
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.wrapper {
  background: #f9f9f9;
  padding: 16px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}

.content-welcome h2 {
  color: #3629b7;
  font-weight: 700;
  margin-bottom: -8px;
}

.login-img {
  width: 210px;
}

.fingerprint {
  width: 64px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 18px;
}

.form input {
  border: #cbcbcb solid 1px;
  padding: 12px;
  border-radius: 12px;
}

.content-image {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}

.content-forgot {
  margin-top: -10px;
  display: flex;
  justify-content: flex-end;
  color: #cbcbcb;
}

.button {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background-color: #f2f1f9;
  border: none;
  color: white;
}

.content-signup {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.content-signup span {
  color: #3629b7;
  cursor: pointer;
}

.content-term {
  display: flex;
  align-items: center;
  gap: 8px;
}

.content-term input {
  width: 30px;
  height: 30px;
}

.content-term span {
  color: #3629b7;
}
</style>
