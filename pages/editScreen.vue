<template>
  <div>
    <AfterLoginHeader />
    <div class="title">
      <h2>アカウント設定</h2>
    </div>

    <div class="container">
      <div class="wrapper">
        <div>
          <div class="input_title">
            <p>ユーザーネーム</p>
            <input type="email" v-model="user_name"/>
          </div>
          <div class="input_title">
            <p>メールアドレス</p>
            <input type="email" v-model="mailaddress" @input="validateEmail"/>
            <p class="error_text">{{ emailErrorText }}</p>
          </div>
          <div @click="updateUser">
            <ChangeButton />
          </div>
          <hr />
        </div>
        <div class="title">
          <h2>パスワード設定</h2>
        </div>
        <div class="input_title">
          <p>現在のパスワード：</p>
          <input type="password" v-model="currentPassword"/>
        </div>
        <div class="input_title">
          <p>新しいパスワード：</p>
          <input type="password" v-model="newPassword"/>
        </div>
        <div class="input_title">
          <p>もう一度パスワードを入力してください：</p>
          <input type="password" v-model="confimationPassword"/>
        </div>
        <div @click="updatePassword">
          <ChangeButton />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import AfterLoginHeader from "../components/AfterLoginHeader";
import Footer from "../components/Footer";
import ChangeButton from "../components/ChangeButton";

export default {
  data: function() {
    return {
      loginUser: '',
      user_name: '',
      mailaddress: '',
      currentPassword: '',
      newPassword: '',
      confimationPassword: '',
      token: '',
      emailError: false
    }
  },
  computed: {
    emailErrorText() {
      if(this.emailError === true || this.mailaddress === '') {
        return '';
      } else {
        return '無効なメールアドレスです';
      }
    },
  },
  mounted() {
    this.loginUser = this.$store.getters.getLoginUser;
    this.user_name = this.$store.getters.getLoginUser.user_name;
    this.mailaddress = this.$store.getters.getLoginUser.mailaddress;
    this.token = this.$store.getters.getToken;
    this.validateEmail();
  },
  methods: {
    // メールアドレス更新処理
    updateUser() {
      const editUserData = {
        'user_id': this.loginUser.user_id,
        'user_name': this.user_name,
        'mailaddress': this.mailaddress
      }
      if(this.emailError) {
        this.$store.dispatch('updateUser', editUserData);
      } else {
        alert('メールアドレスを正しく入力してください');
      }
    },
    // パスワード更新処理
    updatePassword() {
      const newPassword = {
        'user_id': this.loginUser.user_id,
        'trace_code': this.token,
        'password': this.currentPassword,
        'newpassword': this.newPassword
      }
      if(this.currentPassword && this.newPassword && this.confimationPassword) {
        if(this.newPassword === this.confimationPassword) {
          this.$store.dispatch('updatePassword', newPassword);
        } else {
          alert('新しいパスワードと確認用パスワードが一致しません');
        }
      } else {
        alert('全ての項目を入力してください');
      }
    },
    // 入力項目バリデーション処理
    validateEmail(){
      const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      regexp.test(this.mailaddress) ? this.emailError = true: this.emailError = false;
    },
  }
};
</script>

<style scoped>
* {
  font-family: 筑紫A丸ゴシック;
  font-weight: bold;
}
.title {
  margin: 30px 0;
  text-align: center;
}

.title {
  text-align: center;
  margin: 30px 0;
  font-size: 18px;
}

.wrapper {
  padding: 0 20px;
}

.input_title {
  width: 100%;
  margin: 0 auto;
  font-size: 20px;
  margin-bottom: 20px;
}

.input_title > p {
  font-size: 14px;
}

.input_title > input {
  display: block;
  width: 100%;
  height: 28px;
  padding: 5px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #707070;
}

.input_title > .error_text {
  font-size: 14px;
  color: #ff0000;
}

.login_button {
  display: block;
  width: 170px;
  color: #fff;
  background-color: #ff0000;
  font-size: 21px;
  border: none;
  border-radius: 24px;
  padding: 5px;
  margin: 30px auto;
}

.password_reset {
  display: block;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  color: #000;
}

hr {
  margin: 30px 0;
}

.signup_wrapper > h3 {
  text-align: center;
  font-weight: normal;
}

@media (min-width: 560px) {
  .container {
    height: 69vh;
  }

  .wrapper {
    width: 60%;
    margin: 0 auto;
  }

  .input_title > p {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .wrapper {
    width:100%;
  }
  .container {
    width: 100%;
    height:100vh;
  }
  .input_title {
    width: 40%;
  }
  .input_title > p {
    font-size: 20px;
  }

  hr {
    width: 40%;
    margin: 0 auto;
  }
}
</style>