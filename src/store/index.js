import { createStore } from "vuex";
const $ = require("jquery");
export default createStore({
  state: {
    currentArea: {
      name: "台北市",
      enName: "Taipei",
    },
    category: {
      title: "景點",
      enTitle: "spot",
    },
  },
  getters: {},
  mutations: {
    setCurrentArea(state, currentArea) {
      state.currentArea = {
        ...state.currentArea,
        ...currentArea,
      };
    },
    setCategoryTitle(state, category) {
      state.category = {
        ...state.category,
        ...category,
      };
    },
  },
  actions: {
    GetAuthorizationHeader() {
      // 取金鑰資料
      const parameter = {
        grant_type: "client_credentials",
        client_id: "williamhsu88157976-944e828c-c2de-47ed",
        client_secret: "49a3b05b-dbac-4b8d-9cd1-a61c46c0ec6f",
      };
      // 取金鑰API
      const auth_url =
        "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
      $.ajax({
        type: "POST",
        url: auth_url,
        crossDomain: true,
        dataType: "JSON",
        data: parameter,
        async: false,
        success: function (data) {
          // console.log(data.access_token)
          localStorage.setItem("token", data.access_token);
        },
      });
    },
  },
  modules: {},
});
