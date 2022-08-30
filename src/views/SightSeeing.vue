<template>
  <div class="container">
    <MainHeader />
    <div v-if="isSlideLoading">Loading ...</div>
    <SlideSpot v-else :spots="scenicSpots" />
    <div v-if="isLoading">Loading ...</div>
    <div v-else ref="sightList">
      <SpotList :cardList="cardList" />
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
          <span v-else>更多景點</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "../components/MainHead.vue";
import SlideSpot from "./../components/SlideSpot.vue";
import SpotList from "./../components/SpotList.vue";
import spotAPI from "./../apis/scenicSpot";
import { mapState } from "vuex";
import { ref, reactive } from "vue";

export default {
  name: "sightSeeing",
  components: {
    MainHeader,
    SpotList,
    SlideSpot,
  },
  setup() {
    const selectName = ref("");
    const category = ref("");
    const categoryName = ref("");
    const cardList = reactive([]);
    const tempList = reactive([]);
    const scenicSpots = reactive([]);
    const sightList = ref(null);
    const skip = ref(0);
    const top = ref(12);
    const isSlideLoading = ref(false);
    const isLoading = ref(false);
    const isProcessing = ref(false);
    return {
      cardList,
      sightList,
      scenicSpots,
      tempList,
      skip,
      top,
      isLoading,
      isSlideLoading,
      selectName,
      category,
      categoryName,
      isProcessing,
    };
  },
  computed: {
    ...mapState(["currentArea"]),
  },
  created() {
    this.$store.dispatch("GetAuthorizationHeader");
    const { area } = this.$route.params;
    this.fetchSpots(area);
    this.fetchSlideSpot(area);
  },
  methods: {
    async fetchSpots(area) {
      this.isLoading = true;
      let tempArr = [];
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
      tempArr = data.map((card) => ({
        id: card.ScenicSpotID,
        address: card.Address ? card.Address : card.City,
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
      this.cardList.push(...tempArr);
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
      for (let i = 0; i < 5; i++) {
        tempObj.push({
          id: data[count - 1].ScenicSpotID,
          address: data[count - 1].Address
            ? data[count - 1].Address
            : data[count - 1].City,
          city: data[count - 1].City,
          picture: data[count - 1].Picture ? data[count - 1].Picture : {},
          name: data[count - 1].ScenicSpotName,
        });
        count += top / 5;
      }
      this.scenicSpots = tempObj;
      this.isSlideLoading = false;
    },
    showMore() {
      this.isProcessing = true;
      this.skip += 12;
      setTimeout(() => {
        this.fetchSpots(this.$route.params.area);
        this.isProcessing = false;
      }, 1000);
    },
  },
  watch: {
    $route(route) {
      if (route.name === "sightseeing-spot") {
        this.top = 12;
        this.skip = 0;
        this.cardList.splice(0, this.cardList.length);
        this.fetchSpots(route.params.area);
        this.fetchSlideSpot(route.params.area);
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
  .moreBtn {
    background: var(--font-color);
    border: none;
  }
}
</style>
