<template>
  <div class="container">
    <MainHeader />
    <div v-if="isLoading">Loading ...</div>
    <SlideSpot v-else :spots="foodSlide" />
    <div v-if="isLoading">Loading ...</div>
    <SpotList v-else :cardList="foodList" />
  </div>
</template>

<script>
import MainHeader from "./../components/MainHead.vue";
import SlideSpot from "./../components/SlideSpot.vue";
import SpotList from "./../components/SpotList.vue";
import foodAPI from "./../apis/tastyFood";
import { mapState } from "vuex";
import { reactive } from "vue";
export default {
  components: {
    MainHeader,
    SlideSpot,
    SpotList,
  },
  setup() {
    const foodList = reactive([]);
    return {
      foodList,
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
    this.fetchFoodSlide();
    const { area } = this.$route.params;
    this.fetchRestaurant(area);
  },
  methods: {
    async fetchRestaurant(area) {
      this.isLoading = true;
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
      this.foodList = data.map((card) => ({
        id: card.RestaurantID,
        address: card.Address ? card.Address : "",
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
    },
    async fetchFoodSlide() {
      let top = 1000;
      let skip = Math.floor(Math.random() * 100) + 1;
      let count = 200;
      let tempObj = [];
      const { data } = await foodAPI.getAllRestaurant({
        top: `${encodeURIComponent("$")}top=${top}&`,
        skip: `${encodeURIComponent("$")}skip=${skip}&`,
      });
      for (let i = 0; i < 5; i++) {
        tempObj.push({
          id: data[skip].RestaurantID,
          address: data[skip].Address ? data[skip].Address : "",
          city: data[skip].City,
          picture: data[skip].Picture ? data[skip].Picture : {},
          name: data[skip].RestaurantName,
        });
        skip += count;
      }

      this.foodSlide = tempObj;
      this.isLoading = false;
    },
  },
  watch: {
    $route(route) {
      if (route.name === "tasty-food") {
        this.fetchRestaurant(route.params.area);
        this.fetchFoodSlide();
      }
    },
  },
};
</script>
