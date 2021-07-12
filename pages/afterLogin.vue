
<template>
  <div class="container">
    <!-- ヘッダー＆トップ画像 -->
    <AfterLoginHeader />
    <div class="top_img">
      <img src="../assets/top_img.jpg" />
    </div>

    <button type="button" @click="test">テスト</button>

    <!-- 絞り込み -->
    <div class="mobile-hidden" @click="openCategory">
      <SerchButton />
    </div>

    <!-- カテゴリ ＆ 並び替えサイドメニュー（PC版）-->
    <div class="category_and_products_box">
      <div class="list_category_container-mobile smafo-hidden">
        <div class="category_box">
          <h2>カテゴリー</h2>
          <div class="accordion">
            <input type="checkbox" id="check1" class="accordion-hidden" />
            <label for="check1" class="accordion-open">果物</label>
            <label class="accordion-close">
              <ul>
                <li
                  v-for="(fruit, index) in fruits"
                  :key="index"
                  @click="filter($event)"
                >{{ fruit }}</li>
              </ul>
            </label>
            <input type="checkbox" id="check2" class="accordion-hidden" />
            <label for="check2" class="accordion-open">野菜</label>
            <label class="accordion-close">
              <ul>
                <li
                  v-for="(vegetable, index) in vegetables"
                  :key="index"
                  @click="filter($event)"
                >{{ vegetable }}</li>
              </ul>
            </label>
          </div>
        </div>
        <div class="sort_box">
          <h2>並び替え</h2>
          <ul class="list_sort">
            <li @click="sortCheap">料金が安い順</li>
            <li @click="sortExpensive">料金が高い順</li>
          </ul>
        </div>
        <div class="mobile_post_button" @click="openPost">
          <button type="button">投稿する</button>
        </div>
      </div>

      <!-- 商品一覧 -->
      <div>
        <ul class="list_header">
          <li v-for="(product, index) in displayLists" :key="index">
            <div class="list_title">
              <p>{{ product.shop_name }}</p>
              <p class="openEdit" @click="openEditAndDelete(product)">･･･</p>
            </div>
            <div class="list_product_details">
              <div class="list_price_box">
                <p>価格</p>
              </div>
              <p>{{ product.item_name }}</p>
              <small>{{ product.item_quantity }}{{ product.item_unit }}</small>
              <p>{{ product.item_price }}円</p>
            </div>

            <div class="list_date">
              <p>{{ product.post_date }}</p>
              <p>{{ product.user_name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 投稿画面を開くボタン(スマホ時のみ表示) -->
    <div class="post_button" @click="openPost">
      <button type="button">＋</button>
    </div>

        <!-- ページネーションボタン -->
     <v-content>
      <div class="text-center">
        <v-pagination
          v-model="currentPage"
          :length="getPageLength"
          @input = "pageChange"
        ></v-pagination>
      </div>
    </v-content>

    <!-- カテゴリ ＆ 並び替えサイドメニュー（スマホ版）-->
    <div class="overlay" v-show="category" @click="closeCategory"></div>

    <transition name="category">
      <div class="list_category_container" v-show="category">
        <p @click="closeCategory">× 閉じる</p>
        <div class="category_box">
          <h2>カテゴリー</h2>
          <div class="accordion">
            <input type="checkbox" id="check3" class="accordion-hidden" />
            <label for="check3" class="accordion-open">果物</label>
            <label class="accordion-close">
              <ul>
                <li
                  v-for="(fruit, index) in fruits"
                  :key="index"
                  @click="filter($event)"
                >{{ fruit }}</li>
              </ul>
            </label>
            <input type="checkbox" id="check4" class="accordion-hidden" />
            <label for="check4" class="accordion-open">野菜</label>
            <label class="accordion-close">
              <ul>
                <li
                  v-for="(vegetable, index) in vegetables"
                  :key="index"
                  @click="filter($event)"
                >{{ vegetable }}</li>
              </ul>
            </label>
          </div>
        </div>
        <div class="sort_box">
          <h2>並び替え</h2>
          <ul class="list_sort">
            <li @click="sortCheap($event)" value="cheap">料金が安い順</li>
            <li @click="sortExpensive">料金が高い順</li>
          </ul>
        </div>
      </div>
    </transition>

    <!-- 投稿画面 -->
    <div class="overlay" v-show="post" @click="closePost"></div>
    <validation-observer v-slot="{ invalid }">
      <transition name="post">
        <div class="post_container" v-show="post">
          <p @click="closePost">× 閉じる</p>
          <form class="product_input">
            <validation-provider rules="required" class="product-data-input">
              <span>店舗名：</span>
              <select class="user_input" v-model="shop">
                <option>東京野菜市場</option>
                <option>世田谷区野菜市場</option>
                <option>巣鴨野菜市場</option>
                <option>杉並区野菜市場</option>
                <option>下高井戸野菜市場</option>
              </select>
            </validation-provider>
            <validation-provider rules="required" class="product-data-input">
              <span>野菜名：</span>
              <input type="text" class="user_input" v-model="name" />
            </validation-provider>

            <validation-provider rules="required" class="product-data-input">
              <span>個数：</span>
              <select class="user_input" v-model="quantity">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
            </validation-provider>

            <validation-provider rules="required" class="product-data-input">
              <span>単位：</span>
              <select class="user_input" v-model="unit">
                <option>個</option>
                <option>本</option>
                <option>束</option>
                <option>袋</option>
                <option>房</option>
              </select>
            </validation-provider>

            <validation-provider rules="required" class="product-data-input">
              <span>価格：</span>
              <input type="number" class="user_input" v-model="price" />
            </validation-provider>
          </form>
          <div class="posting_button">
            <button type="button" :disabled="invalid" @click="addPost" v-show="postButton">投稿する</button>
            <button type="button" :disabled="invalid" @click="editPost" v-show="editButton">修正を保存</button>
          </div>
        </div>
      </transition>
    </validation-observer>

    <!-- 削除・編集 -->
    <div class="overlay" v-show="edit" @click="closeEditAndDelete"></div>
    <transition name="delete">
      <div class="delete_and_edit_container" v-show="edit">
        <ul class="list_delete_and_edit">
          <li @click="deletePost">削除</li>
          <li @click="openEditScreen">編集</li>
        </ul>
        <button type="button" class="cancell" @click="closeEditAndDelete">キャンセル</button>
      </div>
    </transition>

    <!-- フッター -->
    <Footer />
  </div>
</template>

<script>
import AfterLoginHeader from '../components/AfterLoginHeader';
import Footer from '../components/Footer';
import SerchButton from '../components/SerchButton';

export default {
  data: function() {
    return {
      shop: '',
      name: '',
      unit: '',
      price: '',
      quantity: '',
      selectProduct: '',
      loginUser: '',
      currentPage: 1,
      postButton: false,
      editButton: false,
      category: false,
      edit: false,
      post: false,
      showFluit: false,
      showVegetables: false
    };
  },
  computed: {
    fruits() {
      return this.$store.getters.getFruits;
    },
    vegetables() {
      return this.$store.getters.getVegetables;
    },
    posts() {
      return this.$store.getters.getList;
    },
    displayLists() {
      return this.$store.getters.displayLists;
    },
    getPageLength() {
      return this.$store.getters.getPageLength;
    }
  },
  async created() {
    // データベースからユーザーが投稿したものを取得
    await this.$store.dispatch('getList');
  },
  mounted() {
    this.loginUser = this.$store.getters.getLoginUser;
    // ローディングページの表示
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 3000);
    });
    const userId = {
      'user_id': this.$store.state.loginUser.user_id,
    }
    this.$axios.post('https://api.yasai.tk/user/login_check', userId)
    .then(res => {
      console.log(res);
    })
    .catch(() => {
      alert('ログインチェックに失敗しました');
    })
  },
  methods: {
    test() {
      // console.log(this.$store.state.loginUser);
      console.log(this.loginUser);
      console.log(this.selectProduct);
    },
    // ユーザーが入力した値を投稿
    async addPost() {
      this.$nuxt.$loading.start();
      let currentDate = new Date();
      let yyyy = currentDate.getFullYear();
      let mm = this.toDoubleDigits(currentDate.getMonth() + 1);
      let dd = this.toDoubleDigits(currentDate.getDate());
      let hh = this.toDoubleDigits(currentDate.getHours());
      let mi = this.toDoubleDigits(currentDate.getMinutes());
      let date = yyyy + '/' + mm + '/' + dd + ' ' + hh + ':' + mi;
      const items = {
            shop_name: this.shop,
            item_name: this.name,
            item_quantity: this.quantity,
            item_unit: this.unit,
            item_price: this.price,
            post_date: date,
            user_id: this.$store.state.loginUser.user_id,
            user_name: this.$store.state.loginUser.user_name
      }
      await this.$store.dispatch('addPost', items);
      this.$store.dispatch('getList');
      this.post = false;
      this.shop = '';
      this.name = '';
      this.unit = '';
      this.price = '';
      this.quantity = '';
      setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    },
    //取得した現在時刻をゼロ詰めする為の関数
    toDoubleDigits(num) {
      num += '';
      if (num.length === 1) {
        num = '0' + num;
      }
      return num;
    },
    // 投稿を削除する関数
    async deletePost() {
      await this.$store.dispatch('deletePost', this.selectProduct);
      this.$store.dispatch('getList');
      this.edit = false;
    },
    // 編集した投稿を上書き
    async editPost() {
      const editedContent = {
        user_id: this.loginUser.user_id,
        item_id: this.selectProduct.item_id,
        user_name: this.selectProduct.user_name,
        shop_name: this.shop,
        item_name: this.name,
        item_quantity: this.quantity,
        item_unit: this.unit,
        item_price: this.price,
        post_id: this.selectProduct.post_id
      }
      if(this.selectProduct.user_id === this.loginUser.user_id) {
        await this.$store.dispatch('editPost', editedContent);
        this.$store.dispatch('getList');
      } else {
        alert('投稿者本人のみ編集可能です');
      }
      this.post = false;
      this.editButton = false;
    },
    // ページネーションを発火させる為の関数
    pageChange: function(pageNumber) {
      this.currentPage = pageNumber;
      this.$store.dispatch('pageChange', pageNumber);
    },
    // 価格が安い順に並び替え
    sortCheap() {
      this.$store.dispatch('sortCheap');
    },
    // 価格が高い順に並び替え
    sortExpensive() {
      this.$store.dispatch('sortExpensive');
    },
    // カテゴリ検索でユーザーが選択した野菜名と果物名だけが表示されるようにフィルターをかける
    filter(event) {
      const value = event.target.innerHTML;
      this.$store.dispatch('filter', value);
    },
    // カテゴリーページの開閉判定
    openCategory() {
      this.category = true;
    },
    closeCategory() {
      this.category = false;
    },
    // 投稿画面の開閉判定
    openPost() {
      this.shop = '';
      this.name = '';
      this.unit = '';
      this.price = '';
      this.quantity = '';
      this.post = true;
      this.postButton = true;
      this.editButton = false;
    },
    closePost() {
      this.post = false;
    },
    // 投稿右上の•••をクリックすると同時に選択した要素のidを取得し編集ボタンと削除ボタンが出てくる
    openEditAndDelete(product) {
      this.edit = true;
      this.selectProduct = product;
    },
    closeEditAndDelete() {
      this.edit = false;
    },
    // 編集ボタンをクリックすると編集画面が出現
    openEditScreen() {
      this.post = true;
      this.edit = false;
      this.postButton = false;
      this.editButton = true;
      this.shop = this.selectProduct.shop_name;
      this.name = this.selectProduct.item_name;
      this.unit = this.selectProduct.item_unit;
      this.price = this.selectProduct.item_price;
      this.quantity = this.selectProduct.item_quantity;
    },
    // フルーツアコーディオンメニューの開閉判定
    openFluitAccordion() {
      this.showFluit = !this.showFluit;
    },
    // 野菜アコーディオンメニューの開閉判定
    openVegetablesAccordion() {
      this.showVegetables = !this.showVegetables;
    }
  }
};
</script>

<style>
/* 全体共通スタイル */
* {
  font-family: 筑紫A丸ゴシック;
  font-weight: bold;
}

.container {
  padding: 0;
}

/* トップ画像 */
.top_img > img {
  vertical-align: left;
  width: 100%;
  height: 250px;
}

/* 商品詳細リスト */
.list_header {
  list-style: none;
  height: 1545px;
  padding: 0;
  margin: 0 20px 20px 20px;
}

.list_header > li {
  border: 2px solid #007212;
  border-radius: 22px;
  padding: 10px;
  margin-bottom: 25px;
}

.product-data-input {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
}

.list_title,
.list_product_details,
.list_date {
  display: flex;
  margin-bottom: 10px;
}

.list_product_details {
  position: relative;
  justify-content: space-around;
}

.list_product_details > p {
  font-size: 20px;
  line-height: 40px;
}

.list_product_details > small {
  font-size: 14px;
  line-height: 40px;
}

.list_title {
  font-size: 13px;
  justify-content: space-between;
}

.openEdit {
  cursor: pointer;
}

.list_price_box {
  height: 30px;
  background-color: #ff0000;
  padding: 0 18px;
  border-radius: 7px;
  align-items: center;
  transform: translateY(5px);
}

.list_price_box > p {
  font-size: 14px;
  line-height: 30px;
  color: #fff;
}

.list_date {
  justify-content: space-between;
}

.list_date > p {
  color: #5f5a5a;
  font-size: 12px;
}

/* 投稿ボタン */
.post_button {
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 2;
}
.post_button > button {
  height: 65px;
  width: 65px;
  font-size: 40px;
  line-height: 65px;
  background-color: #ff0000;
  border: none;
  border-radius: 50%;
  color: #fff;
  outline: none;
  cursor: pointer;
}

/* カテゴリメニュー */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 2;
}

.list_category_container {
  padding: 15px 15px 0 15px;
  height: 100vh;
  width: 45%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #fff;
  z-index: 2;
}

.list_category_container > p {
  text-align: right;
}

.category_box > h2,
.sort_box > h2 {
  color: #066811;
  font-size: 20px;
  text-align: center;
  margin: 20px 0;
  border-bottom: 1px solid #707070;
}

.list_category,
.list_sort {
  list-style: none;
  font-size: 16px;
  padding: 0;
}

.list_sort > li:hover {
  background-color: rgba(190, 190, 190, 0.3);
  cursor: pointer;
}

.list_category > li {
  display: flex;
  justify-content: space-between;
}

.smafo-hidden {
  display: none;
}

/* カテゴリメニューアニメーション */
.category-enter,
.category-leave-to {
  transform: translateX(200px);
}

.category-enter-active,
.category-leave-active {
  transition: 0.3s;
}

.category-enter-to {
  transform: translateX(0);
}

/* アコーディオンメニュー */
.accordion-hidden {
  display: none;
}

.accordion-open {
  display: block;
  cursor: pointer;
  margin: 5px 0;
  font-size: 16px;
  position: relative;
}

/* 開閉状態を示すアイコン+の作成 */
.accordion-open::before,
.accordion-open::after {
  content: "";
  width: 15px;
  height: 2px;
  background: #000;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
}

/* 一本だけ縦にして+を作る */
.accordion-open::after {
  transform: translateY(-50%) rotate(90deg);
  transition: 0.6s;
}

/* アコーディオンが開いたら縦棒を横棒にして-にする */
.accordion-hidden:checked + .accordion-open:after {
  transform: translateY(-50%) rotate(0);
}

.accordion-close {
  display: block;
  height: 0;
  overflow: hidden;
  padding: 0;
  opacity: 0;
  transition: 0.6s;
}
.accordion-close > ul {
  list-style: none;
  height: 100px;
  padding: 0;
  font-size: 16px;
  overflow-y: scroll;
}

.accordion-close > ul > li:hover {
  cursor: pointer;
  background-color: rgba(190, 190, 190, 0.3);
}

/* チェックボックスにチェックが入ったら野菜名と果物名を表示する */
.accordion-hidden:checked + .accordion-open + .accordion-close {
  height: auto;
  opacity: 1;
  padding: 5px;
}

/* 削除 ＆ 編集 */
.delete_and_edit_container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 5;
}
.list_delete_and_edit {
  padding: 0;
}

.list_delete_and_edit > li:nth-of-type(1) {
  color: #ff0000;
}

.list_delete_and_edit > li {
  font-size: 24px;
  width: 100%;
  padding: 0 10px;
  list-style: none;
  cursor: pointer;
}

.list_delete_and_edit > li:hover {
  background-color: rgba(190, 190, 190, 0.3);
}

.cancell {
  display: block;
  width: 50%;
  height: 47px;
  font-size: 22px;
  color: #fff;
  background-color: #707070;
  border-radius: 24px;
  border: none;
  text-align: center;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
  cursor: pointer;
}

/* 削除 ＆ 編集　アニメーション */
.delete-enter,
.delete-leave-to {
  transform: translateY(200px);
}

.delete-enter-active,
.delete-leave-active {
  transition: 0.3s;
}

.delete-enter-to {
  transform: translateY(0);
}

/* 投稿画面 */
.post_container {
  position: fixed;
  top: 30%;
  width: 90%;
  margin: 0 20px;
  padding: 15px 0;
  height: 320px;
  background-color: #fff;
  z-index: 6;
}
.post_container > p {
  margin: 0 43px 15px 0;
  text-align: right;
  cursor: pointer;
}

.product_input > p {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  width: 90%;
}

.user_input {
  display: block;
  width: 72%;
  height: 25px;
  margin-bottom: 15px;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 0 5px;
}

.product_input > p > span {
  display: block;
  text-align: left;
}

.posting_button > button {
  display: block;
  width: 170px;
  color: #fff;
  background-color: #ff0000;
  font-size: 21px;
  border: none;
  border-radius: 24px;
  padding: 5px;
  margin: 10px auto;
  cursor: pointer;
}

/* 投稿画面アニメーション */
.post-enter,
.post-leave-to {
  opacity: 0;
}

.post-enter-active,
.post-leave-active {
  transition: 0.2s;
}

.post-enter-to {
  opacity: 1;
}
.content {
  width: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 2;
}
.content > p {
  padding: 0 10px;
}

/* ページネーション */
.v-main {
  margin-bottom: 20px;
}

.theme--light.v-pagination .v-pagination__item--active {
  background-color: #3c6564;
  border: none;
}

.v-pagination__item--active {
  color: black;
}

@media (min-width: 560px) {
  .list_header {
    width: 90%;
    height: 900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
  }

  .top_img > img {
    height: 500px;
  }

  .list_header > li {
    margin-right: 20px;
    width: 47%;
    height: 150px;
  }
  .list_product_details > small {
    line-height: 38px;
  }

  .accordion-close > ul {
    height: 200px;
  }
}

@media (min-width: 1024px) {
  /* 絞り込みボタン */
  .mobile-hidden {
    display: none;
  }

  .top_img > img {
    height: 700px;
  }

  /* カテゴリ ＆ 並べ替え */
  .list_category_container-mobile {
    display: block;
    padding: 15px 15px 0 15px;
    width: 13%;
    height: 100vh;
    background-color: #fff;
  }

  .list_header {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 950px;
    margin: 30px 0 0 0;
    align-content: flex-start;
    justify-content: flex-start;
  }

  .list_header > li {
    padding: 10px 25px;
    width: 570px;
    margin-right: 20px;
  }

  .list_title {
    font-size: 24px;
  }

  .list_product_details {
    justify-content: space-between;
  }

  .list_product_details > small {
    font-size: 20px;
    line-height: normal;
  }

  .category_and_products_box {
    display: flex;
    height: 930px;
  }

  .accordion-close > ul {
    height: 200px;
  }
  /* 投稿ボタン */
  .mobile_post_button > button {
    display: block;
    width: 157px;
    color: #fff;
    background-color: #ff0000;
    font-size: 21px;
    border: none;
    border-radius: 24px;
    padding: 5px;
    margin: 30px auto;
    cursor: pointer;
  }

  .post_button {
    display: none;
  }

  .post_container {
    position: fixed;
    top: 30%;
    left: 30%;
    width: 40%;
    border-radius: 16px;
  }

  .cancell {
    width: 20%;
  }

  /* ページネーション */
  .theme--light.v-pagination .v-pagination__item--active {
  border: none;
  background-color: #3c6564;
}
}
@media (min-width: 1264px) {
  .container {
    max-width: 1440px;
    margin: 0;
    padding: 0;
  }
}
</style>