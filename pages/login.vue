<template>
  <div>
    <Header />
    <!-- <button type="button" @click="getCookie">Cookieを取得する</button> -->
    <div class="title">
      <h3>マイページにログイン</h3>
    </div>
    <div class="container">
      <div class="wrapper">
        <div>
          <validation-observer v-slot="{ invalid }">
          <validation-provider rules="required" v-slot="{ errors }" name="メールアドレス">
              <div class="mailaddress">
                <p>メールアドレス:</p>
                <input type="text" v-model="mailaddress" class="user_input" placeholder="メールアドレス" @input="validateEmail"/>
                <p v-show="errors.length" class="error_message">{{ errors[0] }}</p>
                <p class="error_message">{{ emailErrorText }}</p>
              </div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors }" name="パスワード">
              <div class="password">
                <p>パスワード:</p>
                <input type="password" v-model="password" class="user_input" placeholder="パスワード" />
                <p v-show="errors.length" class="error_message">{{ errors[0] }}</p>
              </div>
            </validation-provider>
          <button type="submit" class="login_button" :disabled="invalid" @click="login">ログイン</button>
          <a href class="password_reset">パスワードを忘れた方はこちら</a>
          <hr />
          </validation-observer>
        </div>
        <div class="signup_wrapper">
          <h3>初めての方はこちら</h3>
          <NuxtLink to="/signup" tag="div">
            <SignUpButton />
          </NuxtLink>
        </div>
      </div>
    </div>
      <p class="button">
        <NuxtLink to="/" tag="button">
          <TopReturnButton />
        </NuxtLink>
      </p>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUpButton from '../components/SignUpButton';
import TopReturnButton from '../components/TopReturnButton';
import $cookies from "cookie-universal-nuxt"

export default {
  data: function() {
    return {
      mailaddress: '',
      password: '',
      emailError: false
    };
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
  methods: {
    async login() {
      const data = {
          'mailaddress': this.mailaddress,
          'password': this.password,
      }
      if(this.emailError) {
        await this.$store.dispatch('login', data);
      } else {
        alert('メールアドレスを正しく入力してください');
      }
    },
    validateEmail(){
      const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      regexp.test(this.mailaddress) ? this.emailError = true: this.emailError = false;
      console.log(this.emailError);
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
  padding: 50px 0;
  width: 90%;
  border: 1px solid #000;
}
.title {
  text-align: center;
  margin: 30px 0;
}

.wrapper {
  padding: 0 20px;
}

.mailaddress,
.password {
  width: 90%;
  margin: 0 auto;
  font-size: 16px;
  margin-bottom: 20px;
}

.user_input {
  display: block;
  width: 100%;
  height: 28px;
  border-radius: 3px;
  border: 1px solid #707070;
  font-size: 16px;
  padding: 0 10px;
}

.mailaddress > .error_message,
.password > .error_message {
  color: #ff0000;
  font-size: 14px;
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
  cursor: pointer;
}

.password_reset {
  display: block;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  color: #000;
}

hr {
  margin: 30px 0;
}

.signup_wrapper > h3 {
  text-align: center;
  font-size: 16px;
}

.button {
  text-align: center;
}

@media (min-width: 560px) {
  .container {
    padding: 100px 0;
    width: 50%;
    margin: 0 auto;
    height: 60vh;
  }
}

@media (min-width: 1024px) {
  .title > h3 {
    font-size: 22px;
  }
  .container {
    width: 30%;
    margin: 0 auto;
    height: 100vh;
    max-width: 1440px;
  }
  .mailaddress > p,
  .password > p {
    font-size: 20px;
  }

  .user_input {
    font-size: 16px;
  }
}
</style>