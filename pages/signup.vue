<template>
  <div>
    <Header />

    <!-- タイトル -->
    <div class="title">
      <h3>新規会員登録</h3>
    </div>

    <!-- ユーザー名／メールアドレス／パスワード入力画面 -->
    <div class="container">
      <validation-observer v-slot="{ invalid }">
        <div class="wrapper">
            <validation-provider rules="required" v-slot="{ errors }" name="ユーザーネーム">
              <div class="user_name">
                <p>ユーザー名:</p>
                <input type="text" v-model="username" class="user_input" placeholder="ユーザーネーム" />
                <p v-show="errors.length" class="error_message">{{ errors[0] }}</p>
              </div>
            </validation-provider>
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
          <button type="submit" class="registration-button" :disabled="invalid" @click="signUp">登録する</button>
        </div>
      </validation-observer>
    </div>

    <!-- トップへ戻るボタン -->
      <p class="button">
        <NuxtLink to="/" tag="button">
          <TopReturnButton />
        </NuxtLink>
      </p>

    <!-- フッター -->
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUpButton from '../components/SignUpButton';
import TopReturnButton from '../components/TopReturnButton';

export default {
  data: function() {
    return {
      username: '',
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
    async signUp() {
      const userData = {
        user_name: this.username,
        mailaddress: this.mailaddress,
        password: this.password
      };

      if(this.emailError) {
        this.$store.dispatch('signUp', userData);
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
  width: 90%;
  padding: 50px 0;
  border: 1px solid #000;
  border-radius: 3px;
}
.title {
  text-align: center;
  margin: 30px 0;
  font-size: 20px;
}

.wrapper {
  padding: 0 20px;
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

.error_message {
  color: #ff0000;
  font-size: 14px;
}

.user_name,
.mailaddress,
.password {
  width: 90%;
  margin: 0 auto;
  font-size: 16px;
  margin-bottom: 20px;
}

.password_reset {
  display: block;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  color: #000;
}

.signup_wrapper {
  margin-top: 50px;
}

.signup_wrapper > h3 {
  text-align: center;
}

.registration-button {
  display: block;
  width: 170px;
  color: #fff;
  background-color: #ff0000;
  font-family: 筑紫A丸ゴシック;
  font-weight: bold;
  font-size: 21px;
  border: none;
  border-radius: 24px;
  padding: 5px;
  margin: 10px auto;
  margin-top: 60px;
  cursor: pointer;
}

.button {
  text-align: center;
}

@media (min-width: 560px) {
  .container {
    width: 50%;
    margin: 0 auto;
    height: 56vh;
    padding: 90px 0;
  }

  .user_name > p,
  .mailaddress > p,
  .password > p {
    font-size: 20px;
  }

  .user_input {
    height: 30px;
  }

  .user_name > .error_message,
  .mailaddress > .error_message,
  .password > .error_message {
    font-size: 14px;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 30%;
    margin: 0 auto;
    height: 75vh;
  }

  .user_name > p,
  .mailaddress > p,
  .password > p {
    font-size: 20px;
  }

  .user_name > input,
  .mailaddress > input,
  .password > input {
    height: 30px;
  }
}
</style>