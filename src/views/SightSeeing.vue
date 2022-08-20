<template>
  <div class="container">
    <MainHeader />
    <div v-if="isLoading">Loading ...</div>
    <SpotList v-else :cardList="cardList" />
  </div>
</template>

<script>
import MainHeader from "../components/MainHead.vue";
import SpotList from "./../components/SpotList.vue";
import spotAPI from "./../apis/scenicSpot";
import { mapState } from "vuex";
const $ = require("jquery");
export default {
  components: {
    MainHeader,
    SpotList,
  },
  data() {
    return {
      top: 12,
      skip: 0,
      selectName: "",
      category: "",
      categoryName: "",
      cardList: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["currentArea"]),
  },
  created() {
    this.GetAuthorizationHeader();
    const { area } = this.$route.params;
    this.fetchSpot(area);
  },
  methods: {
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
    async fetchSpot(area) {
      this.isLoading = true;
      const { data, statusText } = await spotAPI.getSpot({
        area: area,
        select: this.select
          ? `${encodeURIComponent("$")}select=${this.selectName}&`
          : "",
        filter: this.filter
          ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
              `contains(${this.category}, '${this.categoryName}')`
            )}&`
          : "",
        top: `${encodeURIComponent("$")}top=${this.top}&`,
        skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
      });
      if (statusText === "OK") {
        console.log("串接成功!!!");
      }
      this.cardList = data;
      this.isLoading = false;
    },
  },
  watch: {
    $route(route) {
      if (route.name === "sightseeing-spot") {
        this.fetchSpot(route.params.area);
      }
    },
  },
};
</script>
