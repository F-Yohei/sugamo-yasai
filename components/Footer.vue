<template>
  <footer>
    <div class="container">
      <img src="../assets/footer_img.jpg" />
    </div>
  </footer>
</template>

<style scoped>
footer {
  height: 170px;
  background-color: #3b6563;
  text-align: center;
}
.container {
  width: 64%;
  margin: 0 auto;
}

@media (min-width: 560px) {
  .container > img {
    display: block;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .container > img {
    display: block;
    margin: 0 auto;
  }
}
</style>