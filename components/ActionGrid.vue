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
const router = useRouter();

const actions = [
  {
    icon: '/images/wallet.svg',
    text: 'Account and Card',
    path: '/accountcard',
  },
  { icon: '/images/transfer.svg', text: 'Transfer', path: '/transfer' },
  { icon: '/images/withdraw.svg', text: 'Withdraw', path: '/withdraw' },
  { icon: '/images/prepaid.svg', text: 'Mobile prepaid', path: '/prepaid' },
  { icon: '/images/paybill.svg', text: 'Pay bill', path: '/paybill' },
  { icon: '/images/saveonline.svg', text: 'Save online', path: '/save' },
  { icon: '/images/creditcard.svg', text: 'Credit card', path: '/credit' },
  { icon: '/images/transaction.svg', text: 'Transaction report', path: '/transactions' },
  { icon: '/images/beneficiary.svg', text: 'Beneficiary', path: '/beneficiary' },
];

const handleClick = (item: any) => {
  if (item.path) {
    router.push(item.path);
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
