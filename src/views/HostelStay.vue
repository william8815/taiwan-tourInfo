<template>
  <div class="container">
    <MainHead />
    <div v-if="isLoading">Loading ...</div>
    <SlideSpot v-else :spots="hotelSlide" />
    <div v-if="isLoading">Loading ...</div>
    <SpotList v-else :cardList="hotelList" />
  </div>
</template>

<script>
import MainHead from "./../components/MainHead.vue";
import SlideSpot from "./../components/SlideSpot.vue";
import SpotList from "./../components/SpotList.vue";
import hotelAPI from "./../apis/hotelStay";
import { mapState } from "vuex";
import { reactive } from "vue";
export default {
  components: {
    MainHead,
    SlideSpot,
    SpotList,
  },
  setup() {
    const hotelList = reactive([]);
    return {
      hotelList,
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
      hotelSlide: [],
    };
  },
  computed: {
    ...mapState(["currentArea"]),
  },
  created() {
    this.fetchHotelSlide();
    const { area } = this.$route.params;
    this.fetchHotel(area);
  },
  methods: {
    async fetchHotel(area) {
      this.isLoading = true;
      const { data } = await hotelAPI.getHotel({
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
      this.hotelList = data.map((card) => ({
        id: card.HotelID,
        address: card.Address ? card.Address : "",
        city: card.City,
        class1: card.Class ? card.Class : "",
        class2: "",
        class3: "",
        description: card.Description,
        openTime: card.OpenTime,
        phone: card.Phone,
        picture: card.Picture ? card.Picture : {},
        position: card.Position,
        name: card.HotelName,
      }));
    },
    async fetchHotelSlide() {
      let top = 1000;
      let skip = Math.floor(Math.random() * 150) + 1;
      let count = 200;
      let tempObj = [];
      const { data } = await hotelAPI.getAllHotel({
        top: `${encodeURIComponent("$")}top=${top}&`,
        skip: `${encodeURIComponent("$")}skip=${skip}&`,
      });
      for (let i = 0; i < 5; i++) {
        tempObj.push({
          id: data[skip].HotelID,
          address: data[skip].Address ? data[skip].Address : "",
          city: data[skip].City,
          picture: data[skip].Picture ? data[skip].Picture : {},
          name: data[skip].HotelName,
        });
        skip += count;
      }
      this.hotelSlide = tempObj;
      this.isLoading = false;
    },
  },
  watch: {
    $route(route) {
      if (route.name === "hostel-stay") {
        this.fetchHotel(route.params.area);
        this.fetchHotelSlide();
      }
    },
  },
};
</script>
