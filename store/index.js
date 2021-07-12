
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        loginUser: '',
        products: [
          // {item_id:1 , user_name: '太郎',shop_name: '東京野菜市場',item_price: 100, item_name: 'トマト',item_quantity: 1,item_unit: '個',post_date: '2021/04/15 11:30'},
          // {item_id:2 , user_name: '花子',shop_name: '巣鴨野菜市場',item_price: 50, item_name: 'なす',item_quantity: 2,item_unit: '個',post_date: '2021/04/05 12:30'},
          // {item_id:3 , user_name: '一郎',shop_name: '新宿野菜市場',item_price: 300, item_name: 'りんご',item_quantity: 3,item_unit: '個',post_date: '2021/04/03 13:30'},
          // {item_id:4 , user_name: '二郎',shop_name: '杉並区f野菜市場',item_price: 200, item_name: 'きゅうり',item_quantity: 2,item_unit: '個',post_date: '2021/04/04 14:30'},
          // {item_id:5 , user_name: '三郎',shop_name: '世田谷区野菜市場',item_price: 130, item_name: 'ほうれん草',item_quantity: 1,item_unit: '個',post_date: '2021/04/05 16:30'},
          // {item_id:6 , user_name: '三郎',shop_name: '世田谷区野菜市場',item_price: 150, item_name: 'ぶどう',item_quantity: 1,item_unit: '個',post_date: '2021/04/05 16:30'},
          // {item_id:7 , user_name: '三郎',shop_name: '世田谷区野菜市場',item_price: 110, item_name: 'キャベツ',item_quantity: 1,item_unit: '個',post_date: '2021/04/05 16:30'},
          // {item_id:8 , user_name: '三郎',shop_name: '世田谷区野菜市場',item_price: 200, item_name: 'ぶどう',item_quantity: 1,item_unit: '個',post_date: '2021/04/01 10:30'},
          // {item_id:9 , user_name: '四郎',shop_name: '世田谷区野菜市場',item_price: 110, item_name: 'オレンジ',item_quantity: 1,item_unit: '個',post_date: '2021/04/01 11:03'},
          // {item_id:10 , user_name: '一郎',shop_name: '新宿野菜市場',item_price: 200, item_name: 'りんご',item_quantity: 2,item_unit: '個',post_date: '2021/04/08 13:30'},
          // {item_id:11 , user_name: '三郎',shop_name: '世田谷区野菜市場',item_price: 110, item_name: 'キャベツ',item_quantity: 1,item_unit: '個',post_date: '2021/04/05 16:30'},
          // {item_id:12 , user_name: '三郎',shop_name: '世田谷区野菜市場',item_price: 200, item_name: 'ぶどう',item_quantity: 1,item_unit: '個',post_date: '2021/04/01 10:30'},
          // {item_id:13 , user_name: '四郎',shop_name: '世田谷区野菜市場',item_price: 110, item_name: 'オレンジ',item_quantity: 1,item_unit: '個',post_date: '2021/04/01 11:03'},
          // {item_id:14 , user_name: '一郎',shop_name: '新宿野菜市場',item_price: 200, item_name: 'りんご',item_quantity: 2,item_unit: '個',post_date: '2021/04/08 13:30'},
        ],
        fruits: ['すべて','りんご','いちご','ぶどう','メロン','キウイ','オレンジ','test','test','test','test','test','test','test',],
        vegetables: ['すべて','きゅうり','キャベツ','なす','ほうれん草','ごぼう','白菜','test','test','test','test','test','test',],
        displayLists: [],
        token: '',
        page: 1,
        pageSize: 10,
        pageLength: 1,
        filterWord: { name: 'すべて' },
        sort: false
      };
    },
    getters: {
      getLoginUser: function(state) {
        return state.loginUser;
      },
      getProducts: function(state) {
        return state.products;
      },
      displayLists: function(state) {
        return state.displayLists;
      },
      getPageLength: function(state) {
        return state.pageLength;
      },
      getFruits: function(state) {
        return state.fruits;
      },
      getVegetables: function(state) {
        return state.vegetables;
      },
      getToken: function(state) {
        return state.token;
      }
    },
    mutations: {
      loginUser(state, res) {
        state.loginUser = res;
      },
      logout(state) {
        state.loginUser = '';
      },
      displayLists(state) {
        state.displayLists = state.products.slice(0, state.pageSize);
      },
      pageChange(state, pageNumber) {
        if(state.filterWord.name === 'すべて') {
            state.displayLists = state.products.slice(state.pageSize * (pageNumber - 1),state.pageSize * pageNumber);
            state.pageLength = Math.ceil(state.products.length / state.pageSize);
        } else {
            const result = state.products.filter(function(value) {
                return value.item_name === state.filterWord.name
            });
            state.pageLength = Math.ceil(result.length / state.pageSize);
            state.displayLists = result.slice(state.pageSize * (pageNumber - 1),state.pageSize * pageNumber);
        }
      },
      getPageLength(state) {
        state.pageLength = Math.ceil(state.products.length / state.pageSize);
      },
      addPost(state, post) {
        state.products.push(post);
      },
      deletePost(state, selectProduct) {
        let products = state.products;
        state.products = products.filter((product) => product.item_id != selectProduct.item_id);
      },
      editPost(state, editedContent) {
          const returnIndex = state.products.findIndex(element => {
              return element.item_id === editedContent.item_id;
          });
          if(state.products[returnIndex].user_name === state.loginUser.user_name) {
            state.products[returnIndex].shop_name = editedContent.shop_name;
            state.products[returnIndex].item_name = editedContent.item_name;
            state.products[returnIndex].quantity = editedContent.item_quantity;
            state.products[returnIndex].item_unit = editedContent.item_unit;
            state.products[returnIndex].item_price = editedContent.item_price;
          } else {
            alert('投稿者本人のみ編集可能です。');
          }
      },
      filter(state, value) {
        state.filterWord.name = value;
      },
      sortDay(state) {
        state.products.sort(function(a, b) {
            if (a.post_date < b.post_date) {
                return 1;
            } else {
                return -1;
            }
         });
      },
      sortCheap(state) {
        state.sort = true;
        if (state.sort === true) {
          state.displayLists.sort(function(a, b) {
            const a_price = Number(a.item_price);
            const b_price = Number(b.item_price);
            if (a_price < b_price) return -1;
            if (a_price > b_price) return 1;
            return 0;
          });
        }
      },
      sortExpensive(state) {
        state.sort = false;
        if (state.sort === false) {
          state.displayLists.sort(function(a, b) {
            const a_price = Number(a.item_price);
            const b_price = Number(b.item_price);
            if (a_price < b_price) return 1;
            if (a_price > b_price) return -1;
            return 0;
          });
        }
      },
      updateUser(state, editUserData) {
          state.loginUser.user_name = editUserData.user_name;
          state.loginUser.mailaddress = editUserData.mailaddress;
      },
      getList(state, res) {
        state.products = res;
      },
      setLoginUser(state, loginUser) {
        state.loginUser = loginUser;
      }
    },
    actions: {
    // 新規登録
    async signUp({ context }, userData) {
      await this.$axios
        .post('https://api.yasai.tk/user/regist', userData)
        .then(res => {
          alert('登録が完了しました');
          this.$router.push('/login');
        })
        .catch(() => {
          alert('登録に失敗しました');
        });
    },
    // ログイン
    login({ commit, state }, data) {
      this.$axios.post('https://api.yasai.tk/user/login', data)
      .then(res => {
        const token = res.headers.tracecode;
        state.token = token;
        commit('loginUser', res.data.body);
        this.$router.push('/afterLogin');
        console.log(res);
      })
      .catch(() => {
        alert('ログインに失敗しました');
      })
    },
    // ログアウト
     async logout({ commit }, userId) {
        await this.$axios.post('https://api.yasai.tk/user/logout', userId)
        .then(res => {
          commit('logout');
          localStorage.removeItem('PermanentStorage');
          this.$router.push('/');
        })
        .catch(() => {
          alert('ログアウトに失敗しました');
        })
     },
    // ユーザー退会
    async userWithdrawal({ state, commit }) {
      const user_id = {
        'user_id': state.loginUser.user_id,
        'trace_code': state.token
      }
      await this.$axios.post('https://api.yasai.tk/user/quit', user_id)
        .then(res => {
          alert('退会が完了しました');
          localStorage.removeItem('PermanentStorage');
          state.loginUser = '';
          this.$router.push('/');
          console.log(res);
        })
        .catch(() => {
          alert('退会に失敗しました');
        });
    } ,
    // 配列productsに格納されているデータの中から10件ずつ表示させる為の関数
    　displayLists({ commit }) {
        commit('displayLists');
    },
    　// 商品情報投稿処理
    　async addPost({ commit }, post) {
        await this.$axios.post('https://api.yasai.tk/itemprices/post?shop_name=%E3%82%B7%E3%83%A7%E3%83%83%E3%83%97%E5%90%8D&item_name=%E3%82%AD%E3%83%A3%E3%83%99%E3%83%84&item_price=50&item_unit=%E5%80%8B', post)
        .then(res => {
          commit('addPost', post);
        })
        .catch(() => {
          alert('投稿に失敗しました');
        })
    　},
      // 商品情報削除処理
      async deletePost({ state, commit }, selectProduct) {
        if(selectProduct.user_id === state.loginUser.user_id) {
          const userId = {
            'user_id': state.loginUser.user_id,
            'item_id': selectProduct.item_id,
            'post_id': selectProduct.post_id
          }
          await this.$axios.post('https://api.yasai.tk/itemprices/delete', userId)
          .then(res => {
            commit('deletePost', selectProduct);
            console.log(res);
          })
          .catch(() => {
            alert('削除に失敗しました');
          })
        } else {
          alert('投稿者本人のみ削除可能です。');
        }
      },
      // 商品情報編集処理
      async editPost({ commit, state }, editedContent) {
        await this.$axios.post('https://api.yasai.tk/itemprices/edit', editedContent)
        .then(res => {
          commit('editPost', editedContent);
          console.log(res);
        })
        .catch(() => {
          alert('上書きに失敗しました');
        })
        commit('pageChange', state.page);
      },
      //  ページネーションさせる関数
      pageChange({ commit }, pageNumber) {
        commit('pageChange', pageNumber);
      },
      //  ページ数を取得
      getPageLength({ commit }) {
        commit('getPageLength');
      },
      // カテゴリ別検索処理
      async filter({ commit }, value) {
        await commit('filter', value);
        commit('pageChange', 1);
      },
      // 価格が安い順に並び替え
      sortCheap({ commit }) {
        commit('sortCheap');
      },
      //日付が新しい順に並び替え
      sortDay({ commit }) {
        commit('sortDay');
      },
      // 価格が高い順に並び替え
      sortExpensive({ commit }) {
        commit('sortExpensive');
      },
      // ユーザー情報編集
      async updateUser({ commit }, editUserData) {
        await this.$axios.post('https://api.yasai.tk/user/edit', editUserData)
        .then(res => {
          commit('updateUser', editUserData);
          alert('変更しました');
        })
        .catch(() => {
          alert('変更に失敗しました');
        })
      },
      // パスワード変更
      updatePassword({ context }, newPassword) {
        this.$axios.post('https://api.yasai.tk/user/changepw', newPassword)
        .then(res => {
          alert('パスワードが変更されました');
          console.log(res);
        })
        .catch(() => {
          alert('パスワードの変更に失敗しました');
        })
      },
      // データベースから商品情報取得
      async getList({ commit, state }) {
        await this.$axios.$get('https://api.yasai.tk/itemprices/list?sort=date&order=desc&category=vegetables&page=2')
        .then(res => {
            commit('getList', res.body);
          })
        .catch(()  => {
          alert('データの取得ができませんでした');
        })
          commit('sortDay');
          commit('pageChange', state.page);
          commit('getPageLength');
      },
    }
  });
};

export default createStore;