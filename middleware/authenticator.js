export default function ({ redirect, store, route }) {
    const loginUser = store.state.loginUser;
    if(route.path === '/' && !loginUser ) {
      return false;
    } else if(!loginUser && route.path !== '/login' && route.path !== '/signup') {
      redirect('/login')
    }
  }