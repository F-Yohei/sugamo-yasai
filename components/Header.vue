<template>
  <header>
    <div class="container">
    <NuxtLink to="/" tag="div">
      <div class="area_logo_header">
        <a href="#" class="logo">
          <img src="../assets/logo.svg" />
        </a>
      </div>
    </NuxtLink>
      <NuxtLink to="/login" tag="div" class="login">
        <div class="login-button">
          <p>ログイン</p>
        </div>
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
}
.container {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #e9e6e1;
  padding: 0;
}

/* ログイン */
.login {
  height: 50px;
  font-size: 14px;
  margin-left: auto;
}

.login-button > p {
  line-height: 50px;
}

/* ロゴ */
.area_logo_header .logo {
  display: block;
}
.area_logo_header .logo > img {
  height: 50px;
  vertical-align: bottom;
}

.login:hover {
  background-color: rgba(190, 190, 190, 0.3);
  cursor: pointer;
}

@media (min-width: 560px) {
  .login {
    height: 80px;
  }

  .login-button > p {
    line-height: 80px;
    font-size: 20px;
  }

  .container {
    background-color: #e9e6e1;
    height: 80px;
  }

  .area_logo_header .logo > img {
    height: 80px;
    width: auto;
  }
}

@media (min-width: 1024px) {
  .login {
    height: 80px;
  }

  .login-button {
    text-align: center;
  }

  .login-button > p {
    width: 100%;
    line-height: 80px;
    font-size: 20px;
    margin-right: 20px;
  }

  .login:hover {
    background-color: rgba(190, 190, 190, 0.3);
  }
  .container {
    background-color: #e9e6e1;
    height: 80px;
    margin: 0;
    max-width: 1440px;

  }

  .area_logo_header .logo > img {
    height: 80px;
    width: auto;
  }
}
</style>