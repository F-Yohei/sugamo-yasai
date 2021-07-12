<template>
  <div class="container">
    <!-- ヘッダー＆トップ画像 -->
    <Header />
    <div class="top_img">
      <img src="../assets/top_img.jpg" />
    </div>

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
      </div>

      <!-- 商品一覧 -->
      <div class="list_product_container">
        <ul class="list_header">
          <li v-for="(product, index) in displayLists" :key="index">
            <div class="list_title">
              <p>{{ product.shop_name }}</p>
            </div>
            <div class="list_product_details">
              <div class="list_price_box">
                <p>価格</p>
              </div>
              <p>{{ product.item_name }}</p>
              <small>{{ product.item_quantity}}{{ product.item_unit }}</small>
              <p>{{ product.item_price }}円</p>
            </div>

            <div class="list_date">
              <p>{{ product.post_date}}</p>
              <p>{{ product.user_name }}</p>
            </div>
          </li>
        </ul>
      </div>
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

    <!-- フッター -->
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import SerchButton from "../components/SerchButton";

export default {
  data: function() {
    return {
      category: false,
      currentPage: 1,
    };
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
    fruits() {
      return this.$store.getters.getFruits;
    },
    vegetables() {
      return this.$store.getters.getVegetables;
    },
    displayLists() {
      return this.$store.getters.displayLists;
    },
    getPageLength() {
      return this.$store.getters.getPageLength;
    }
  },
  created() {
    // データベースからユーザーが投稿したものを取得
      this.$store.dispatch('getList');
  },
  mounted() {
    // ローディングページの表示
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    });
  },
  methods: {
    // ページネーションを発火させる為の関数
    pageChange: function(pageNumber){
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
      this.$store.dispatch('pageChange', this.currentPage);
    },
    // カテゴリーページの開閉判定
    openCategory() {
      this.category = true;
    },
    closeCategory() {
      this.category = false;
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

<style lang="scss">
// @import '~/assets/variables';

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

/* カテゴリメニュー */
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

.smafo-hidden {
  display: none;
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

/* ページネーション */
.v-main {
  margin-bottom: 20px;
}

.theme--light.v-pagination .v-pagination__item {
  background: #FFFFFF;
    color: rgba(0, 0, 0, 0.87);
}

.theme--light.v-pagination .v-pagination__item--active {
  color: #fff;
  border: none;
  background-color: $color-bg;
}

@media (min-width: 560px) {
   .top_img > img {
    height: 500px;
  }

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
// .theme--light.v-pagination .v-pagination__item {
//   background: #FFFFFF;
//     color: rgba(0, 0, 0, 0.87);
// }

// .theme--light.v-pagination .v-pagination__item--active {
//   color: #fff;
//   border: none;
//   background-color: $color-bg;
// }

   .top_img > img {
    height: 700px;
  }

  /* 絞り込みボタン */
  .mobile-hidden {
    display: none;
  }

/* カテゴリ ＆ 並べ替え */
  .list_category_container-mobile {
    display: block;
    padding: 15px 15px 0 15px;
    margin-right: 20px;
    width: 13%;
    height: 100vh;
    background-color: #fff;
  }

  .list_product_container {
    width: 82%;
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

.accordion-close > ul {
    list-style: none;
    padding: 0;
    height: 200px;
    font-size: 16px;
}

.accordion-close > ul > li:hover {
    cursor: pointer;
    background-color: rgba(190, 190, 190, 0.3);
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
}

.list_sort > li:hover {
    background-color: rgba(190, 190, 190, 0.3);
    cursor: pointer;
}

@media (min-width: 1264px) {
.container {
    max-width: 1440px;
    margin: 0;
    padding: 0;
}

.accordion-close > ul {
  height: 200px;
}
}
</style>