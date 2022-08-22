<template>
  <div class="container">
    <MainHead />
    <div v-if="isLoading">...Loading</div>
    <InfoSection v-else :initial_info="activity" />
    <h2>更多旅館 :</h2>
    <!-- <div v-if="isLoading">...Loading</div>
    <MoreSection v-else :more_spot="moreSpot" /> -->
  </div>
</template>

<script>
import MainHead from "./../components/MainHead.vue";
import InfoSection from "../components/InfoSection.vue";
// import MoreSection from "./../components/MoreSection.vue";
import activityAPI from "./../apis/activityFun";
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
    const activity = reactive({
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
    const moreActivity = reactive([]);
    const isLoading = ref(false);
    return {
      top,
      skip,
      activity,
      isLoading,
      moreActivity,
    };
  },
  created() {
    const { area } = this.$route.params;
    this.fetchOneHostel(area);
  },
  methods: {
    async fetchOneHostel(area) {
      this.isLoading = true;
      const { data, statusText } = await activityAPI.getActivity({
        area: area,
        select: "",
        filter: `${encodeURIComponent("$")}filter=${encodeURIComponent(
          `contains(ActivityID, '${this.$route.params.id}')`
        )}&`,
        top: `${encodeURIComponent("$")}top=${this.top}&`,
        skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
      });
      if (statusText === "OK") {
        console.log("串接成功!!!");
      }
      this.activity = {
        id: data[0].ActivityID,
        address: data[0].Address ? data[0].Address : "",
        class1: data[0].Class1 ? data[0].Class1 : "",
        class2: data[0].Class2 ? data[0].Class2 : "",
        class3: data[0].Class3 ? data[0].Class3 : "",
        description: data[0].Description,
        openTime: data[0].Cycle,
        phone: data[0].Phone,
        picture: data[0].Picture ? data[0].Picture : {},
        position: data[0].Position,
        name: data[0].ActivityName,
        location: data[0].Location ? data[0].Location : "",
        organizer: data[0].Organizer ? data[0].Organizer : "",
        start: data[0].StartTime ? data[0].StartTime : "",
        end: data[0].EndTime ? data[0].EndTime : "",
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
