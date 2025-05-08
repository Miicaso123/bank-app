<template>
  <div class="app">
    <div v-if="isMobile" class="page">
      <AppHeader :userName="userName" />

      <transition name="slide-up">
        <div v-if="iframeVisible" class="iframe-wrapper">
          <iframe :src="iframeUrl" class="iframe-content" />
        </div>
      </transition>

      <div class="content">
        <AccountCard :name="userName" />
        <ActionGrid @open-iframe="openIframe" />
        <BottomNav />
      </div>
    </div>

    <div v-else class="nopage">
      <NoPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const isMobile = ref<boolean>(true);
const authStore = useAuthStore();
const iframeVisible = ref<boolean>(false);
const iframeUrl = ref<string>('');

const userName = computed(() => authStore.user?.name || 'Guest');

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 500;
};

const openIframe = async (url: string) => {
  await nextTick();
  const name = userName.value;
  iframeUrl.value = `${url}?name=${encodeURIComponent(name)}`;
  iframeVisible.value = true;
};

const handleMessage = (event: MessageEvent) => {
  const data = event.data;

  if (data?.type === 'CLOSE_IFRAME') {
    iframeVisible.value = false;
  }

  if (data?.type === 'SAVE_ROUTE') {
    localStorage.setItem('lastIframeUrl', data.route);
  }
};

onMounted(() => {
  checkScreen();
  window.addEventListener('resize', checkScreen);
  authStore.initAuth();

  window.addEventListener('message', handleMessage);

  const lastRoute = localStorage.getItem('lastIframeUrl');
  if (lastRoute) {
    iframeUrl.value = lastRoute;
    iframeVisible.value = true;
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen);
  window.removeEventListener('message', handleMessage);
});
</script>

<style scoped>
.page {
  background: #3629b7;
  height: 30vh;
}

.content {
  background: #f9f9f9;
  padding: 16px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.iframe-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 999;
  display: flex;
  flex-direction: column;
}

.iframe-content {
  flex: 1;
  border: none;
  width: 100%;
}
</style>
