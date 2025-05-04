<template>
  <nav class="bottom-nav">
    <div class="bottom-home">
      <img src="/images/home.svg" alt="home" class="bottom-img" />
      <div>Home</div>
    </div>
    <div><img src="/images/search.svg" alt="search" class="bottom-img" /></div>
    <div><img src="/images/letter.svg" alt="letter" class="bottom-img" /></div>
    <div><img src="/images/settings.svg" alt="settings" class="bottom-img" /></div>
  </nav>
</template>

<style scoped>
.bottom-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: white;
  padding: 12px;
  border-top: 1px solid #ddd;
  margin-top: 24px;
}

.bottom-nav div {
  cursor: pointer;
}

.bottom-home {
  width: 74px;
  background-color: #3629b7;
  color: white;
  padding: 8px 16px;
  border-radius: 16px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.bottom-img {
  width: 20px;
  height: 20px;
}
</style>
