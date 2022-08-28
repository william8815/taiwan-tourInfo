<template>
  <div class="container">
    <MainHead />
    <div v-if="isSlideLoading">Loading ...</div>
    <SlideSpot v-else :spots="hotelSlide" />
    <div v-if="isLoading">Loading ...</div>
    <div v-else ref="hostelList">
      <SpotList :cardList="hotelList" />
      <div class="btn-section">
        <button
          @click="showMore"
          class="moreBtn btn btn-primary"
          :disabled="isLoading"
        >
          <div
            v-if="isProcessing"
            class="spinner-border spinner-border-sm text-light"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          <span v-else>更多旅館</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MainHead from "./../components/MainHead.vue";
import SlideSpot from "./../components/SlideSpot.vue";
import SpotList from "./../components/SpotList.vue";
import hotelAPI from "./../apis/hotelStay";
import { mapState } from "vuex";
import { ref, reactive } from "vue";
export default {
  components: {
    MainHead,
    SlideSpot,
    SpotList,
  },
  setup() {
    const hotelList = reactive([]);
    const isSlideLoading = ref(false);
    const hostelList = ref(null);
    const isProcessing = ref(false);
    return {
      hotelList,
      isSlideLoading,
      hostelList,
      isProcessing,
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
    const { area } = this.$route.params;
    this.fetchHotel(area);
    this.fetchHotelSlide(area);
  },
  methods: {
    async fetchHotel(area) {
      this.isLoading = true;
      let tempArr = [];
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
      tempArr = data.map((card) => ({
        id: card.HotelID,
        address: card.Address ? card.Address : card.City,
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
      this.hotelList.push(...tempArr);
      this.isLoading = false;
    },
    async fetchHotelSlide(area) {
      this.isSlideLoading = true;
      let top = 25;
      let skip = Math.floor(Math.random() * 9) + 1;
      let count = top / 5;
      let tempObj = [];
      const { data } = await hotelAPI.getHotel({
        area: area,
        select: "",
        filter: "",
        top: `${encodeURIComponent("$")}top=${top}&`,
        skip: `${encodeURIComponent("$")}skip=${skip}&`,
      });
      for (let i = 0; i < 5; i++) {
        tempObj.push({
          id: data[count - 1].HotelID,
          address: data[count - 1].Address
            ? data[count - 1].Address
            : data[count - 1].City,
          city: data[count - 1].City,
          picture: data[count - 1].Picture ? data[count - 1].Picture : {},
          name: data[count - 1].HotelName,
        });
        count += top / 5;
      }
      this.hotelSlide = tempObj;
      this.isSlideLoading = false;
    },
    showMore() {
      this.isProcessing = true;
      this.skip += 12;
      setTimeout(() => {
        this.fetchHotel(this.$route.params.area);
        this.isProcessing = false;
      }, 1000);
    },
  },
  watch: {
    $route(route) {
      if (route.name === "hostel-stay") {
        this.top = 12;
        this.skip = 0;
        this.hotelList.splice(0, this.hotelList.length);
        this.fetchHotel(route.params.area);
        this.fetchHotelSlide(route.params.area);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-section {
  width: 100%;
  text-align: center;
  padding: 1rem 0;
}
</style>
