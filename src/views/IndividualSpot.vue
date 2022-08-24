<template>
  <div class="container">
    <MainHead />
    <div v-if="isLoading">...Loading</div>
    <InfoSection v-else :initial_info="spot" />
    <h2>更多景點 :</h2>
    <!-- <div v-if="isLoading">...Loading</div>
    <MoreSection v-else :more_spot="moreSpot" /> -->
  </div>
</template>

<script>
import MainHead from "./../components/MainHead.vue";
import InfoSection from "../components/InfoSection.vue";
// import MoreSection from "./../components/MoreSection.vue";
import spotAPI from "./../apis/scenicSpot";
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
    const spot = reactive({
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
    const moreSpot = reactive([]);
    const isLoading = ref(false);
    return {
      top,
      skip,
      spot,
      isLoading,
      moreSpot,
    };
  },
  created() {
    this.fetchOneSpot();
  },
  methods: {
    async fetchOneSpot() {
      this.isLoading = true;
      const { data, statusText } = await spotAPI.getAllSpot({
        filter: `${encodeURIComponent("$")}filter=${encodeURIComponent(
          `contains(ScenicSpotID, '${this.$route.params.id}')`
        )}&`,
        top: `${encodeURIComponent("$")}top=${this.top}&`,
        skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
      });
      if (statusText === "OK") {
        console.log("串接成功!!!");
      }
      this.spot = {
        id: data[0].ScenicSpotID,
        address: data[0].Address ? data[0].Address : "",
        class1: data[0].Class1 ? data[0].Class1 : "",
        class2: data[0].Class2 ? data[0].Class2 : "",
        class3: data[0].Class3 ? data[0].Class3 : "",
        description: data[0].DescriptionDetail,
        openTime: data[0].OpenTime,
        phone: data[0].Phone,
        picture: data[0].Picture ? data[0].Picture : {},
        position: data[0].Position,
        name: data[0].ScenicSpotName,
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
