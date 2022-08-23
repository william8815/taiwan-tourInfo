<template>
  <div class="container">
    <MainHead />
    <div v-if="isSlideLoading">Loading ...</div>
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
import { ref, reactive } from "vue";
export default {
  components: {
    MainHead,
    SlideSpot,
    SpotList,
  },
  setup() {
    const activityList = reactive([]);
    const isSlideLoading = ref(false);
    return {
      activityList,
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
      activitySlide: [],
    };
  },
  computed: {
    ...mapState(["currentArea"]),
  },
  created() {
    const { area } = this.$route.params;
    this.fetchActivity(area);
    this.fetchActivitySlide(area);
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
      this.isLoading = false;
    },
    async fetchActivitySlide(area) {
      this.isSlideLoading = true;
      let top = 30;
      let skip = 0;
      const tempObj = [];
      const { data } = await ActivityAPI.getActivity({
        area: area,
        select: "",
        filter: "",
        top: `${encodeURIComponent("$")}top=${top}&`,
        skip: `${encodeURIComponent("$")}skip=${skip}&`,
      });
      if (data.length >= 5) {
        for (let i = data.length - 1; i > data.length - 6; i--) {
          tempObj.unshift({
            id: data[i].ActivityID,
            address: data[i].Address ? data[i].Address : "",
            city: data[i].City,
            picture: data[i].Picture ? data[i].Picture : {},
            name: data[i].ActivityName,
          });
          this.activitySlide = tempObj;
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          tempObj.unshift({
            id: data[i].ActivityID,
            address: data[i].Address ? data[i].Address : "",
            city: data[i].City,
            picture: data[i].Picture ? data[i].Picture : {},
            name: data[i].ActivityName,
          });
          this.activitySlide = tempObj;
        }
        console.log("hello2");
      }
      this.isSlideLoading = false;
    },
  },
  watch: {
    $route(route) {
      if (route.name === "activity-fun") {
        this.fetchActivity(route.params.area);
        this.fetchActivitySlide(route.params.area);
      }
    },
  },
};
</script>
