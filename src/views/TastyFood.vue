<template>
  <div class="container">
    <MainHeader />
    <div v-if="isSlideLoading">Loading ...</div>
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
    return {
      foodList,
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
            address: data[count - 1].Address ? data[count - 1].Address : "",
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
  },
  watch: {
    $route(route) {
      if (route.name === "tasty-food") {
        this.fetchRestaurant(route.params.area);
        this.fetchFoodSlide(route.params.area);
      }
    },
  },
};
</script>
