<template>
  <div class="container">
    <MainHeader />
    <div v-if="isSlideLoading">Loading ...</div>
    <SlideSpot v-else :spots="scenicSpots" />
    <div v-if="isLoading">Loading ...</div>
    <SpotList v-else :cardList="cardList" />
  </div>
</template>

<script>
import MainHeader from "../components/MainHead.vue";
import SlideSpot from "./../components/SlideSpot.vue";
import SpotList from "./../components/SpotList.vue";
import spotAPI from "./../apis/scenicSpot";
import { mapState } from "vuex";
import { ref, reactive } from "vue";
const $ = require("jquery");
export default {
  components: {
    MainHeader,
    SpotList,
    SlideSpot,
  },
  setup() {
    const cardList = reactive([]);
    const isSlideLoading = ref(false);
    return {
      cardList,
      isSlideLoading,
    };
  },
  data() {
    return {
      top: 12,
      skip: 0,
      selectName: "",
      category: "",
      categoryName: "",
      isLoading: false,
      scenicSpots: [],
    };
  },
  computed: {
    ...mapState(["currentArea"]),
  },
  created() {
    this.GetAuthorizationHeader();
    const { area } = this.$route.params;
    this.fetchSpots(area);
    this.fetchSlideSpot(area);
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
    async fetchSpots(area) {
      this.isLoading = true;
      const { data } = await spotAPI.getSpot({
        area: area,
        select: this.selectName
          ? `${encodeURIComponent("$")}select=${this.selectName}&`
          : "",
        filter: this.category
          ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
              `contains(${this.category}, '${this.categoryName}')`
            )}&`
          : "",
        top: `${encodeURIComponent("$")}top=${this.top}&`,
        skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
      });
      this.cardList = data.map((card) => ({
        id: card.ScenicSpotID,
        address: card.Address ? card.Address : "",
        city: card.City,
        class1: card.Class1 ? card.Class1 : "",
        class2: card.Class2 ? card.Class2 : "",
        class3: card.Class3 ? card.Class3 : "",
        description: card.DescriptionDetail,
        openTime: card.OpenTime,
        phone: card.Phone,
        picture: card.Picture ? card.Picture : {},
        position: card.Position,
        name: card.ScenicSpotName,
      }));
      this.isLoading = false;
    },
    async fetchSlideSpot(area) {
      this.isSlideLoading = true;
      let top = 50;
      let skip = Math.floor(Math.random() * 9) + 1;
      let count = top / 5;
      let tempObj = [];
      const { data } = await spotAPI.getSpot({
        area: area,
        select: "",
        filter: "",
        top: `${encodeURIComponent("$")}top=${top}&`,
        skip: `${encodeURIComponent("$")}skip=${skip}&`,
      });
      console.log(data);
      for (let i = 0; i < 5; i++) {
        tempObj.push({
          id: data[count - 1].ScenicSpotID,
          address: data[count - 1].Address ? data[count - 1].Address : "",
          city: data[count - 1].City,
          picture: data[count - 1].Picture ? data[count - 1].Picture : {},
          name: data[count - 1].ScenicSpotName,
        });
        count += top / 5;
      }
      this.scenicSpots = tempObj;
      this.isSlideLoading = false;
    },
  },
  watch: {
    $route(route) {
      if (route.name === "sightseeing-spot") {
        this.fetchSpots(route.params.area);
        this.fetchSlideSpot(route.params.area);
      }
    },
  },
};
</script>
