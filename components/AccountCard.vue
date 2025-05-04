<template>
  <section class="card">
    <div class="card-content">
      <h2>{{ name }}</h2>
      <p>Amazon Platinum</p>
      <p>**** **** **** 9018</p>
      <h3>$3,469.52</h3>
    </div>
  </section>
</template>

<script setup lang="ts">
    defineProps<{name: string}>();
</script>

<style scoped>
.card {
  margin-top: 20px;
  background: linear-gradient(135deg, #3629b7, #5abdf2);
  color: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
