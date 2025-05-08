<template>
  <div class="nopage-content">
    <h2>You need scan the QR Code</h2>
    <p>Open the app on smartphone by scanning this QR</p>
    <img
      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://kbankapp.netlify.app/"
      alt="QR Code"
      class="nopage-qr"
    />
  </div>
</template>

<style scoped>
.nopage-content {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  padding-top: 40px;
}

.nopage-content h2 {
  font-size: 24px;
  margin-bottom: 12px;
}

.nopage-content p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.nopage-qr {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 12px;
}
</style>
