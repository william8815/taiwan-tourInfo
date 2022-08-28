<template>
  <div class="container">
    <MainHeader />
    <div v-if="isSlideLoading">Loading ...</div>
    <SlideSpot v-else :spots="foodSlide" />
    <div v-if="isLoading">Loading ...</div>
    <div v-else ref="restaurantList">
      <SpotList :cardList="foodList" />
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
          <span v-else>更多美食</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "./../components/MainHead.vue";
import SlideSpot from "./../components/SlideSpot.vue";
import SpotList from "./../components/SpotList.vue";
import foodAPI from "./../apis/tastyFood";
import { mapState } from "vuex";
import { ref, reactive } from "vue";
export default {
  components: {
    MainHeader,
    SlideSpot,
    SpotList,
  },
  setup() {
    const foodList = reactive([]);
    const isSlideLoading = ref(false);
    const restaurantList = ref(null);
    const isProcessing = ref(false);
    return {
      foodList,
      isSlideLoading,
      restaurantList,
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
      foodSlide: [],
    };
  },
  computed: {
    ...mapState(["currentArea"]),
  },
  created() {
    const { area } = this.$route.params;
    this.fetchRestaurant(area);
    this.fetchFoodSlide(area);
  },
  methods: {
    async fetchRestaurant(area) {
      this.isLoading = true;
      let tempArr = [];
      const { data } = await foodAPI.getRestaurant({
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
        id: card.RestaurantID,
        address: card.Address ? card.Address : card.City,
        city: card.City,
        class1: card.Class ? card.Class : "",
        class2: "",
        class3: "",
        description: card.DescriptionDetail,
        openTime: card.OpenTime,
        phone: card.Phone,
        picture: card.Picture ? card.Picture : {},
        position: card.Position,
        name: card.RestaurantName,
      }));
      this.foodList.push(...tempArr);
      this.isLoading = false;
    },
    async fetchFoodSlide(area) {
      this.isSlideLoading = true;
      let top = 20;
      let skip = Math.floor(Math.random() * 9) + 1;
      let count = top / 5;
      const tempObj = [];
      const { data } = await foodAPI.getRestaurant({
        area: area,
        select: "",
        filter: "",
        top: `${encodeURIComponent("$")}top=${top}&`,
        skip: `${encodeURIComponent("$")}skip=${skip}&`,
      });
      if (data.length !== 0) {
        for (let i = 0; i < 5; i++) {
          tempObj.push({
            id: data[count - 1].RestaurantID,
            address: data[count - 1].Address
              ? data[count - 1].Address
              : data[count - 1].City,
            city: data[count - 1].City,
            picture: data[count - 1].Picture ? data[count - 1].Picture : {},
            name: data[count - 1].RestaurantName,
          });
          count += top / 5;
        }
        this.foodSlide = tempObj;
      } else {
        this.foodSlide = [];
      }
      this.isSlideLoading = false;
    },
    showMore() {
      this.isProcessing = true;
      this.skip += 12;
      setTimeout(() => {
        this.fetchRestaurant(this.$route.params.area);
        this.isProcessing = false;
      }, 1000);
    },
  },
  watch: {
    $route(route) {
      if (route.name === "tasty-food") {
        this.top = 12;
        this.skip = 0;
        this.foodList.splice(0, this.foodList.length);
        this.fetchRestaurant(route.params.area);
        this.fetchFoodSlide(route.params.area);
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
