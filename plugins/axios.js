export default ({ store, $axios }) => {
    $axios.onRequest(config => {
      config.headers.common['tracecode'] = store.state.token;
    });
  }