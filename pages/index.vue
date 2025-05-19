<template>
  <div class="app">
    <Spinner v-if="isLoading" />

    <template v-else>
      <div v-if="isMobile" class="page">
        <AppHeader :userName="userName" />

        <div class="content">
          <AccountCard :name="userName" :card="lastCard" />
          <ActionGrid />
          <BottomNav />
        </div>
      </div>

      <div v-else class="nopage">
        <NoPage />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { iframeMap } from '@/utils/iframeMap';

const isLoading = ref(true);
const isMobile = ref<boolean>(true);
const iframeUrl = ref<string | null>(null);
const lastCard = ref(null);
const authStore = useAuthStore();

const userName = computed(() => authStore.user?.name || 'Guest');

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 500;
};

const handleMessage = (event: MessageEvent) => {
  const data = event.data;

  if (!data?.type || !['SAVE_ROUTE', 'CARD_UPDATED'].includes(data.type)) {
    return;
  }

  if (data?.type === 'SAVE_ROUTE') {
    const urlFromMap = iframeMap[data.route as keyof typeof iframeMap];
    if (urlFromMap && iframeUrl.value !== urlFromMap) {
      localStorage.setItem('lastIframeUrl', urlFromMap);
      iframeUrl.value = urlFromMap;
    }
  } else if (data.type === 'CARD_UPDATED' && data.card) {
    console.log('Updating lastCard:', data.card);
    lastCard.value = data.card;
    localStorage.setItem('lastCard', JSON.stringify(data.card));
  }
};

onMounted(() => {
  if (typeof window === 'undefined') return;

  checkScreen();
  window.addEventListener('resize', checkScreen);
  window.addEventListener('message', handleMessage);

  const savedUrl = localStorage.getItem('lastIframeUrl');
  if (savedUrl) {
    iframeUrl.value = savedUrl;
  }

  const savedCard = localStorage.getItem('lastCard');
  if (savedCard) {
    try {
      lastCard.value = JSON.parse(savedCard);
    } catch (error) {
      console.error('Error parsing lastCard from localStorage:', error);
    }
  }

  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});

onUnmounted(() => {
  if (typeof window === 'undefined') return;
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
</style>
