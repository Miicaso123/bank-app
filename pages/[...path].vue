<template>
  <Spinner v-if="isLoading" />
  <template v-else>
    <transition name="slide-up">
      <div v-if="iframeUrl" class="iframe-wrapper">
        <iframe :src="iframeUrl" class="iframe-content" />
      </div>
    </transition>
  </template>
</template>

<script setup lang="ts">
import { iframeMap } from '@/utils/iframeMap';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);

const path = '/' + (route.params.path as string[]).join('/');
const iframeUrl = iframeMap[path] || '';

if (!iframeUrl) {
  router.push('/');
}

const userName = computed(() => authStore.user?.name || 'Guest');

const sendUserInfo = () => {
  const message = {
    type: 'USER_INFO',
    name: userName.value,
  };

  const iframe = document.querySelector('iframe');
  if (iframe?.contentWindow) {
    console.log('Sending USER_INFO:', message);
    iframe.contentWindow.postMessage(message, '*');
  }
};

const handleMessage = (event: MessageEvent) => {
  const data = event.data;
  if (data?.type === 'CLOSE_IFRAME') {
    router.push('/');
    localStorage.removeItem('lastIframeUrl');
  } else if (data?.type === 'IFRAME_READY') {
    sendUserInfo();
  } else if (data?.type === 'CARD_UPDATED' && data?.card) {
    window.postMessage(
      {
        type: 'CARD_UPDATED',
        card: data.card,
      },
      '*',
    );
  }
};

onMounted(() => {
  if (typeof window === 'undefined') return;

  window.addEventListener('message', handleMessage);

  watch(userName, () => {
    sendUserInfo();
  });

  setTimeout(() => {
    isLoading.value = false;
  }, 700);
});

onUnmounted(() => {
  if (typeof window === 'undefined') return;
  window.removeEventListener('message', handleMessage);
});
</script>

<style scoped>
.iframe-content {
  width: 100%;
  height: 100dvh;
  border: none;
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
</style>
