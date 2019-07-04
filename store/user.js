export const state = () => {
  return {
    userInfo: {
      token: "",
      user: []
    }
  }
}


export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  clearUserInfo(state) {
    state.userInfo = {
      token: "",
      user: []
    }
  }
}


export const actions = {
  login({
    commit
  }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      const data = res.data
      setTimeout(() => commit("setUserInfo", data), 1000)
      return data
    })
  },
  register({
    commit
  }, data) {
    return this.$axios({
      url: "/accounts/register",
      method: "POST",
      data
    }).then(res => {
      const data = res.data;
      setTimeout(() => commit("setUserInfo", data), 1000);
      return data;
    });
  }
}
