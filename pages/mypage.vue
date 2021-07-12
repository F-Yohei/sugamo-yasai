<template>
  <div>
    <AfterLoginHeader />
    <div class="container">
      <div class="title">
        <h2>マイページ</h2>
      </div>

      <div class="user_wrapper">
        <div class="user_infomation">
          <p>ユーザー名： {{ loginUser.user_name }}</p>
          <p>メールアドレス： {{ loginUser.mailaddress }}</p>
          <p>ポイント数： {{ loginUser.point }}ポイント</p>
        </div>
        <p class="button">
          <EditButton />
        </p>
        </div>
      </div>
      <p class="button">
        <router-link to="/afterLogin" tag="button">
          <TopReturnButton />
        </router-link>
      </p>

        <p>
          <button type="button" class="quit_button" @click="userWithdrawal">退会する</button>
        </p>

    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import AfterLoginHeader from "../components/AfterLoginHeader";
import Footer from "../components/Footer";
import EditButton from "../components/EditButton";
import TopReturnButton from "../components/TopReturnButton";

export default {
  computed: {
    loginUser() {
      return this.$store.getters.getLoginUser
    }
  },
  mounted() {
    console.log(this.$store.state.token);
  },
  methods: {
  userWithdrawal() {
    this.$store.dispatch('userWithdrawal');
  }
  }
};
</script>

<style scoped>
* {
    font-family: 筑紫A丸ゴシック;
  font-weight: bold;
}

.container {
  width: 86%;
}
.title {
  margin: 30px 0;
  text-align: center;
}
.user_wrapper {
  border: 2px solid #007212;
  border-radius: 22px;
  padding: 40px 35px;
  margin-bottom: 25px;
}

.user_infomation > p {
  margin: 20px 0;
}

.button {
  text-align: center;
}

.quit_button {
  display: block;
  width: 170px;
  color: #fff;
  background-color: #ff0000;
  font-size: 21px;
  border: none;
  border-radius: 24px;
  padding: 5px;
  margin: 40px auto;
  cursor: pointer;
}

.footer {
  margin-top: 125px;
}

@media (min-width: 560px) {
  .container {
    margin: 0 50px;
    height: 51vh;
  }

  .user_wrapper {
    padding: 70px 25px;
    height: 370px;
  }

  .user_infomation > p {
    font-size: 30px;
  }
}

@media (min-width: 1024px) {
  .container {
    height: 70vh;
    width: 100%;
    max-width: 1440px;
    margin: 0;
  }
  .user_wrapper {
    width: 40%;
    margin: 0 auto;
  }

  .user_infomation > p {
    font-size: 20px;
  }
}
</style>