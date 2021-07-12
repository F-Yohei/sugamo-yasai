<template>
  <header>
    <div class="container">
      <!-- ヘッダー -->
      <div class="mobile-header-container">
        <NuxtLink to="/afterLogin" tag="div">
          <div class="area_logo_header">
            <a href="#" class="logo">
              <img src="../assets/logo.svg" />
            </a>
          </div>
        </NuxtLink>

        <ul class="mobile-list_menu">
          <NuxtLink to="/mypage" tag="div">
            <li class="list_mypage">
              <p>マイページ</p>
            </li>
          </NuxtLink>
          <li class="list_logout" @click="logout">
            <p>ログアウト</p>
          </li>
        </ul>
      </div>

      <!-- ハンバーガーメニュー -->
      <section class="mobile-hidden">
        <div class="btn-trigger" @click="openSideMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      <!-- マイページ・ログアウトメニュー -->
      <div class="overlay" v-show="active" @click="closeSideMenu"></div>
      <transition name="menu">
        <div class="list_menu_container" v-show="active">
          <p @click="closeSideMenu">× 閉じる</p>
          <ul class="list_menu">
            <NuxtLink to="/mypage" tag="div">
              <li class="list_mypage">
                <p>マイページ</p>
              </li>
            </NuxtLink>
            <li class="list_logout" @click="logout">
              <p>ログアウト</p>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
export default {
  data: function() {
    return {
      loginUser: '',
      active: false
    };
  },
  mounted() {
    this.loginUser = this.$store.getters.getLoginUser;
  },
  methods: {
    openSideMenu() {
      this.active = true;
    },
    closeSideMenu() {
      this.active = false;
    },
    logout() {
      const userId = {
        'user_id':this.loginUser.user_id
      }
      this.$store.dispatch('logout', userId);
    }
  }
};
</script>

<style scoped>
.mobile-list_menu {
  display: none;
}

header {
  width: 100%;
}

.container {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #e9e6e1;
}

/* ハンバーガーメニュー */
section {
  margin-left: auto;
}
.btn-trigger {
  position: relative;
  width: 50px;
  height: 44px;
  cursor: pointer;
}
.btn-trigger span {
  position: absolute;
  left: 0;
  width: 60%;
  height: 3px;
  background-color: #000;
  border-radius: 4px;
  margin-left: 10px;
}
.btn-trigger,
.btn-trigger span {
  display: inline-block;
  transition: all 0.5s;
  box-sizing: border-box;
}
.btn-trigger span:nth-of-type(1) {
  top: 10px;
}
.btn-trigger span:nth-of-type(2) {
  top: 20px;
}
.btn-trigger span:nth-of-type(3) {
  bottom: 10px;
}

/* ロゴ */
.area_logo_header .logo {
  display: block;
}
.area_logo_header .logo > img {
  height: 50px;
  vertical-align: bottom;
}

/* サイドメニュー */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  z-index: 2;
}
.list_menu_container {
  padding: 15px 10px 0 10px;
  height: 100vh;
  width: 45%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #fff;
  z-index: 3;
}
.list_menu_container > p {
  text-align: right;
}
.list_menu {
  padding: 0;
}
.list_mypage,
.list_logout {
  font-size: 16px;
  font-family: 筑紫A丸ゴシック;
  font-weight: bold;
  list-style: none;
  border-bottom: 1px solid #707070;
}

.list_mypage > p,
.list_logout > p {
  color: #707070;
}

/* サイドメニューアニメーション */
.menu-enter,
.menu-leave-to {
  transform: translateX(200px);
}

.menu-enter-active,
.menu-leave-active {
  transition: 0.3s;
}

.menu-enter-to {
  transform: translateX(0);
}

@media (min-width: 560px) {
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
  .mobile-hidden {
    display: none;
  }
  .smafo-hidden {
    display: none;
  }
  .container {
    background-color: #e9e6e1;
    height: 80px;
    max-width: 1440px;
  }

  .mobile-header-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .area_logo_header .logo > img {
    height: 80px;
    width: auto;
  }

  .mobile-list_menu {
    display: flex;
  }

.list_mypage,
.list_logout {
  border: none;
  text-align: center;
}

  .list_mypage > p,
  .list_logout > p {
    width: 100%;
    height: 80px;
    margin-right: 10px;
    line-height: 80px;
    font-size: 20px;
    color: #000;
  }

  .list_mypage > p:hover,
  .list_logout > p:hover {
  background-color: rgba(190, 190, 190, 0.3);
  cursor: pointer;
  }
}
</style>