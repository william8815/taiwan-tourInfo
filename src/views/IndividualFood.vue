<template>
  <div class="container">
    <MainHead />
    <div v-if="isLoading">...Loading</div>
    <InfoSection v-else :initial_info="food" />
    <h2>更多美食 :</h2>
    <!-- <div v-if="isLoading">...Loading</div>
    <MoreSection v-else :more_spot="moreSpot" /> -->
  </div>
</template>

<script>
import MainHead from "../components/MainHead.vue";
import InfoSection from "../components/InfoSection.vue";
// import MoreSection from "./../components/MoreSection.vue";
import foodAPI from "../apis/tastyFood";
import { ref, reactive } from "vue";
export default {
  components: {
    MainHead,
    InfoSection,
    // MoreSection,
  },
  setup() {
    const top = ref(1);
    const skip = ref(0);
    const food = reactive({
      id: -1,
      address: "",
      class1: "",
      class2: "",
      class3: "",
      description: "",
      openTime: "",
      phone: "",
      picture: {},
      position: "",
      name: "",
    });
    const moreFood = reactive([]);
    const isLoading = ref(false);
    return {
      top,
      skip,
      food,
      isLoading,
      moreFood,
    };
  },
  created() {
    this.fetchOneFood();
  },
  methods: {
    async fetchOneFood() {
      this.isLoading = true;
      const { data, statusText } = await foodAPI.getAllRestaurant({
        filter: `${encodeURIComponent("$")}filter=${encodeURIComponent(
          `contains(RestaurantID, '${this.$route.params.id}')`
        )}&`,
        top: `${encodeURIComponent("$")}top=${this.top}&`,
        skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
      });
      if (statusText === "OK") {
        console.log("串接成功!!!");
      }
      this.food = {
        id: data[0].RestaurantID,
        address: data[0].Address ? data[0].Address : "",
        class1: data[0].Class ? data[0].Class : "",
        class2: "",
        class3: "",
        description: data[0].Description,
        openTime: data[0].OpenTime,
        phone: data[0].Phone,
        picture: data[0].Picture ? data[0].Picture : {},
        position: data[0].Position,
        name: data[0].RestaurantName,
        website: data[0].WebsiteUrl ? data[0].WebsiteUrl : "",
      };
      this.isLoading = false;
    },
  },
  // watch: {
  //   $route(route) {
  //     this.fetchOneSpot(route.params.area);
  //     console.log(route);
  //   },
  // },
};
</script>
