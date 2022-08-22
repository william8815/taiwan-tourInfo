<template>
  <div class="container">
    <MainHead />
    <div v-if="isLoading">Loading ...</div>
    <SlideSpot v-else :spots="activitySlide" />
    <div v-if="isLoading">Loading ...</div>
    <SpotList v-else :cardList="activityList" />
  </div>
</template>

<script>
import MainHead from "./../components/MainHead.vue";
import SlideSpot from "./../components/SlideSpot.vue";
import SpotList from "./../components/SpotList.vue";
import ActivityAPI from "./../apis/activityFun";
import { mapState } from "vuex";
import { reactive } from "vue";
export default {
  components: {
    MainHead,
    SlideSpot,
    SpotList,
  },
  setup() {
    const activityList = reactive([]);
    return {
      activityList,
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
      activitySlide: [],
    };
  },
  computed: {
    ...mapState(["currentArea"]),
  },
  created() {
    this.fetchActivitySlide();
    const { area } = this.$route.params;
    this.fetchActivity(area);
  },
  methods: {
    async fetchActivity(area) {
      this.isLoading = true;
      const { data } = await ActivityAPI.getActivity({
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
      this.activityList = data.map((card) => ({
        id: card.ActivityID,
        address: card.Address ? card.Address : "",
        city: card.City,
        class1: card.Class1 ? card.Class1 : "",
        class2: card.Class2 ? card.Class2 : "",
        class3: card.Class3 ? card.Clas3 : "",
        description: card.Description,
        openTime: card.Cycle,
        phone: card.Phone,
        picture: card.Picture ? card.Picture : {},
        position: card.Position,
        name: card.ActivityName,
      }));
    },
    async fetchActivitySlide() {
      let top = 150;
      let skip = Math.floor(Math.random() * 25) + 1;
      let count = 30;
      const tempObj = [];
      const { data } = await ActivityAPI.getAllActivity({
        top: `${encodeURIComponent("$")}top=${top}&`,
        skip: `${encodeURIComponent("$")}skip=${skip}&`,
      });
      for (let i = 0; i < 5; i++) {
        tempObj.push({
          id: data[skip].ActivityID,
          address: data[skip].Address ? data[skip].Address : "",
          city: data[skip].City,
          picture: data[skip].Picture ? data[skip].Picture : {},
          name: data[skip].ActivityName,
        });
        skip += count;
      }
      this.activitySlide = tempObj;
      this.isLoading = false;
    },
  },
  watch: {
    $route(route) {
      if (route.name === "activity-fun") {
        this.fetchActivity(route.params.area);
        this.fetchActivitySlide();
      }
    },
  },
};
</script>
