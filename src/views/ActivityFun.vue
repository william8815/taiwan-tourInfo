<template>
  <div class="container">
    <MainHead />
    <div v-if="isSlideLoading">Loading ...</div>
    <SlideSpot v-else :spots="activitySlide" />
    <div v-if="isLoading">Loading ...</div>
    <div v-else ref="activity">
      <SpotList :cardList="activityList" />
    </div>
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
    const activity = ref(null);
    return {
      activityList,
      isSlideLoading,
      activity,
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    async fetchActivity(area) {
      this.isLoading = true;
      let tempArr = [];
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
      tempArr = data.map((card) => ({
        id: card.ActivityID,
        address: card.Address ? card.Address : card.City,
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
      this.activityList.push(...tempArr);
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
            address: data[i].Address ? data[i].Address : data[i].City,
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
    handleScroll() {
      let scrollHeight = this.activity.scrollHeight;
      let clientHeight = document.body.clientHeight;
      let scrollTop = Math.floor(
        Math.abs(this.activity.getBoundingClientRect().top)
      );
      let distance = 2;
      if (scrollTop + clientHeight >= scrollHeight - distance) {
        this.skip += 12;
        window.removeEventListener("scroll", this.handleScroll, true);
        setTimeout(() => {
          this.fetchActivity(this.$route.params.area);
          window.addEventListener("scroll", this.handleScroll, true);
        }, 1000);
      }
    },
  },
  watch: {
    $route(route) {
      if (route.name === "activity-fun") {
        this.top = 12;
        this.skip = 0;
        this.fetchActivity(route.params.area);
        this.fetchActivitySlide(route.params.area);
      }
    },
  },
};
</script>
