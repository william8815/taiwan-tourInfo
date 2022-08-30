<template>
  <div class="container">
    <div v-if="isLoading">...Loading</div>
    <InfoSection v-else :initial_info="spot" />
    <h2>更多景點 :</h2>
    <div v-if="isMoreLoading">...Loading</div>
    <MoreSection v-else :more_spot="moreSpot" />
  </div>
</template>

<script>
import InfoSection from "../components/InfoSection.vue";
import MoreSection from "./../components/MoreSection.vue";
import spotAPI from "./../apis/scenicSpot";
import { ref, reactive } from "vue";
export default {
  components: {
    InfoSection,
    MoreSection,
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
    const isMoreLoading = ref(false);
    return {
      top,
      skip,
      spot,
      isLoading,
      moreSpot,
      isMoreLoading,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchOneSpot(id);
    this.fetchMoreSpot();
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchOneSpot(id);
    this.fetchMoreSpot();
    next();
  },
  methods: {
    async fetchOneSpot(id) {
      this.isLoading = true;
      console.log(this.$route.name);
      const { data, statusText } = await spotAPI.getAllSpot({
        filter: `${encodeURIComponent("$")}filter=${encodeURIComponent(
          `contains(ScenicSpotID, '${id}')`
        )}&`,
        top: `${encodeURIComponent("$")}top=${this.top}&`,
        skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
      });
      if (statusText === "OK") {
        console.log("串接成功!!!");
      }
      this.spot = {
        id: data[0].ScenicSpotID,
        address: data[0].Address ? data[0].Address : data[0].City,
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
    async fetchMoreSpot() {
      this.isMoreLoading = true;
      const { data, statusText } = await spotAPI.getAllSpot({
        filter: "",
        top: `${encodeURIComponent("$")}top=${10}&`,
        skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
      });
      if (statusText === "OK") {
        console.log("串接成功!!!");
      }
      this.moreSpot = data.map((spot) => {
        return {
          id: spot.ScenicSpotID,
          address: spot.Address ? spot.Address : spot.City,
          class1: spot.Class1 ? spot.Class1 : "",
          class2: spot.Class2 ? spot.Class2 : "",
          class3: spot.Class3 ? spot.Class3 : "",
          description: spot.DescriptionDetail,
          openTime: spot.OpenTime,
          phone: spot.Phone,
          picture: spot.Picture ? spot.Picture : {},
          position: spot.Position,
          name: spot.ScenicSpotName,
        };
      });
      this.moreSpot = this.moreSpot.filter(
        (spot) => spot.id !== this.$route.params.id
      );
      this.isMoreLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
