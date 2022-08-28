<template>
  <div class="container">
    <MainHeader :searchState="isSearchState" />
    <div class="title">
      <i @click="$router.back()" class="fa-solid fa-arrow-left px-3"></i>
      <span>搜尋結果</span>
    </div>
    <div v-if="isLoading">...Loading</div>
    <div v-else class="search-list mt-3">
      <div
        v-for="spot in searchResult"
        :key="spot.id"
        class="search-card card mb-2"
      >
        <div class="card-image">
          <router-link
            :to="{
              name: `individual-${category.enTitle}`,
              params: { area: $route.params.area, id: spot.id },
            }"
          >
            <img
              :src="
                spot.picture.PictureUrl1 ||
                'https://i.postimg.cc/nz9DxX0W/other-User.png'
              "
              class="card-img-top"
              :alt="spot.name"
            />
          </router-link>
        </div>
        <div class="spot-body card-body">
          <router-link
            :to="{
              name: `individual-${category.enTitle}`,
              params: { area: $route.params.area, id: spot.id },
            }"
          >
            <h3 class="card-title">{{ spot.name }}</h3>
            <p class="card-text">{{ spot.city }}</p>
          </router-link>
        </div>
      </div>
    </div>
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
        <span v-else>更多景點</span>
      </button>
    </div>
  </div>
</template>

<script>
import MainHeader from "./../components/MainHead.vue";
import spotAPI from "./../apis/scenicSpot";
import foodAPI from "./../apis/tastyFood";
import hotelAPI from "./../apis/hotelStay";
import activityAPI from "./../apis/activityFun";
import { mapState } from "vuex";
import { ref, reactive } from "vue";
export default {
  components: {
    MainHeader,
  },
  setup() {
    const keyword = ref("");
    const searchResult = reactive([]);
    const top = ref(12);
    const skip = ref(0);
    const isLoading = ref(false);
    const resultList = ref(null);
    const search = ref(null);
    const isProcessing = ref(false);
    const isSearchState = ref(true);
    return {
      keyword,
      searchResult,
      top,
      skip,
      isLoading,
      resultList,
      search,
      isProcessing,
      isSearchState,
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.keyword = this.searchKeyWord;
    this.fetchSearchList(this.keyword);
  },
  computed: {
    ...mapState(["category", "currentArea", "searchKeyWord"]),
  },
  methods: {
    async fetchSearchList(keyword) {
      if (keyword.trim().length !== 0) {
        switch (this.category.enTitle) {
          case "spot":
            this.searchSpot(keyword);
            break;
          case "food":
            this.searchFood(keyword);
            break;
          case "hostel":
            this.searchHostel(keyword);
            break;
          case "activity":
            this.searchActivity(keyword);
            break;
          default:
            break;
        }
      } else {
        this.searchResult = [];
      }
    },
    async searchSpot(keyword) {
      try {
        this.isLoading = true;
        let tempArr = [];
        const { data } = await spotAPI.getAllSpot({
          filter: this.category
            ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
                `contains(ScenicSpotName, '${keyword}')`
              )}&`
            : "",
          top: `${encodeURIComponent("$")}top=${this.top}&`,
          skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
        });
        tempArr = data.map((result) => ({
          id: result.ScenicSpotID,
          name: result.ScenicSpotName,
          city: result.Address,
          picture: result.Picture ? result.Picture : {},
        }));
        this.searchResult.push(...tempArr);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async searchFood(keyword) {
      try {
        this.isLoading = true;
        let tempArr = [];
        const { data } = await foodAPI.getAllRestaurant({
          filter: this.category
            ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
                `contains(RestaurantName, '${keyword}')`
              )}&`
            : "",
          top: `${encodeURIComponent("$")}top=${this.top}&`,
          skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
        });
        tempArr = data.map((result) => ({
          id: result.RestaurantID,
          name: result.RestaurantName,
          city: result.Address,
          picture: result.Picture ? result.Picture : {},
        }));
        this.searchResult.push(...tempArr);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async searchHostel(keyword) {
      try {
        this.isLoading = true;
        let tempArr = [];
        const { data } = await hotelAPI.getAllHotel({
          filter: this.category
            ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
                `contains(HotelName, '${keyword}')`
              )}&`
            : "",
          top: `${encodeURIComponent("$")}top=${this.top}&`,
          skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
        });
        tempArr = data.map((result) => ({
          id: result.HotelID,
          name: result.HotelName,
          city: result.Address,
          picture: result.Picture ? result.Picture : {},
        }));
        this.searchResult.push(...tempArr);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async searchActivity(keyword) {
      try {
        this.isLoading = true;
        let tempArr = [];
        const { data } = await activityAPI.getAllActivity({
          filter: this.category
            ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
                `contains(ActivityName, '${keyword}')`
              )}&`
            : "",
          top: `${encodeURIComponent("$")}top=${this.top}&`,
          skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
        });
        tempArr = data.map((result) => ({
          id: result.ActivityID,
          name: result.ActivityName,
          city: result.Address,
          picture: result.Picture ? result.Picture : {},
        }));
        this.searchResult.push(...tempArr);
        console.log(this.searchResult);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    showMore() {
      this.isProcessing = true;
      this.skip += 12;
      setTimeout(() => {
        this.fetchSearchList(this.keyword);
        this.isProcessing = false;
      }, 1000);
    },
    // handleSearch(keyWord) {
    //   console.log(keyWord);
    //   this.keyword = keyWord;
    //   this.fetchSearchList(this.keyword);
    // },
  },
  watch: {
    searchKeyWord(keyword) {
      this.fetchSearchList(keyword);
    },
    $route(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 245px !important;
  font-size: 1.5rem;
  i {
    cursor: pointer;
  }
}
.search-card {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  overflow: hidden;
  padding: 0.5rem;
}
.card-image {
  align-self: center;
  width: 30vw;
  height: 30vw;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease-in-out;
  }
  img:hover {
    transform: scale(1.2);
  }
}
.badge-item {
  font-size: 0.5rem;
}
.btn-section {
  width: 100%;
  text-align: center;
  padding: 1rem 0;
}
// 平板
@media screen and (min-width: 768px) {
  .title {
    margin-top: 265px !important;
  }
  .search-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: auto;
    gap: 0.75rem;
  }
  .search-card {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .card-image {
    width: 100%;
    height: 20vh;
  }
}
// PC
@media screen and (min-width: 960px) {
  .title {
    margin-top: 235px !important;
  }
}
</style>
