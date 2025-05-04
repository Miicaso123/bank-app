<template>
  <header class="header">
    <div class="header-user">
      <img src="/images/Avatar.png" alt="User" class="header-avatar" />
      <span @click="toLogin" class="header-name">Hi, {{ userName }}</span>
    </div>
    <div class="header-notification">
      <span class="header-bell"><img src="/images/bell.svg" alt="bell" /></span>
      <span class="header-badge">3</span>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ userName: string }>();

const router = useRouter();

const toLogin = () => {
  router.push('/authentication');
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3629b7;
  padding: 16px;
  color: white;
}

.header-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-badge {
  background-color: red;
  border-radius: 50%;
  padding: 4px 8px;
  color: white;
}
</style>
