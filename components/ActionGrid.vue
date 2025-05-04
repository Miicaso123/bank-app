<template>
  <section class="actions">
    <div class="actions-grid">
      <div v-for="(item, index) in actions" :key="index" class="action" @click="handleClick(item)">
        <img :src="item.icon" :alt="item.text" />
        <p>{{ item.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits(['open-iframe']);

const actions = [
  {
    icon: '/images/wallet.svg',
    text: 'Account and Card',
    url: 'http://https://kbankaccountcard.netlify.app',
  },
  { icon: '/images/transfer.svg', text: 'Transfer' },
  { icon: '/images/withdraw.svg', text: 'Withdraw' },
  { icon: '/images/prepaid.svg', text: 'Mobile prepaid' },
  { icon: '/images/paybill.svg', text: 'Pay bill' },
  { icon: '/images/saveonline.svg', text: 'Save online' },
  { icon: '/images/creditcard.svg', text: 'Credit card' },
  { icon: '/images/transaction.svg', text: 'Transaction report' },
  { icon: '/images/beneficiary.svg', text: 'Beneficiary' },
];

const handleClick = (item: any) => {
  if (item.url) {
    emit('open-iframe', item.url);
  }
};
</script>

<style scoped>
.actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 20px;
}

.action {
  background: white;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}
</style>
