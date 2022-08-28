<template>
  <div class="search-section">
    <div class="search p-3 mb-2 bg-white text-dark">
      <div class="search-result">
        <div v-if="isLoading"></div>
        <ul v-else ref="resultList" class="result-list px-0">
          <router-link
            v-for="result in searchResult"
            :key="result.id"
            :to="{
              name: `individual-${category.enTitle}`,
              params: { area: $route.params.area, id: result.id },
            }"
          >
            <li class="list-item">
              <div>
                <p>
                  <b>{{ result.name }}</b>
                </p>
                <p>{{ result.city }}</p>
              </div>
              <div class="image">
                <img
                  :src="
                    result.picture.PictureUrl1 ||
                    'https://i.postimg.cc/nz9DxX0W/other-User.png'
                  "
                  alt=""
                />
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import spotAPI from "./../apis/scenicSpot";
import foodAPI from "./../apis/tastyFood";
import hotelAPI from "./../apis/hotelStay";
import activityAPI from "./../apis/activityFun";
import { mapState } from "vuex";
import { ref, reactive } from "vue";
export default {
  props: {
    search_keyword: String,
  },
  setup(props) {
    const keyword = ref(props.search_keyword);
    const searchResult = reactive([]);
    const top = ref(10);
    const skip = ref(0);
    const isLoading = ref(false);
    const resultList = ref(null);
    const search = ref(null);
    return {
      keyword,
      searchResult,
      top,
      skip,
      isLoading,
      resultList,
      search,
    };
  },
  created() {
    this.fetchSearchList(this.keyword);
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
  computed: {
    ...mapState(["category"]),
  },
  methods: {
    fetchSearchList(keyword) {
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

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    handleScroll() {
      let scrollHeight = this.resultList.scrollHeight + 122;
      let clientHeight = document.body.clientHeight;
      let scrollTop = Math.floor(
        Math.abs(this.resultList.getBoundingClientRect().top)
      );
      let distance = 68;
      if (scrollTop + clientHeight >= scrollHeight - distance) {
        this.top += 12;
        window.removeEventListener("scroll", this.handleScroll, false);
        setTimeout(() => {
          this.fetchSearchList(this.keyword);
          window.addEventListener("scroll", this.handleScroll, true);
        }, 1000);
      }
    },
  },
  watch: {
    search_keyword(value) {
      this.keyword = value;
      this.fetchSearchList(value);
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  /* make scrollbar transparent */
  width: 0px;
  background: transparent;
}
.search-section {
  position: absolute;
  left: calc(5vw + 52px);
  right: calc(5vw + 40px);
  top: 82px;
  z-index: 999;
  text-align: start;
  border-right: 2px solid #a4a4a4;
  border-left: 2px solid #a4a4a4;
}
.search-result {
  height: calc(100vh - 145px);
  overflow-y: scroll;
}
.list-item {
  display: grid;
  grid-template-columns: 1fr 10vh;
  column-gap: 0.25rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--main-color);
}
.image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
@media screen and (min-width: 480px) {
  .search-section {
    top: 86px;
  }
}
@media screen and (min-width: 768px) {
  .search-section {
    left: calc(15vw + 52px);
    right: calc(15vw + 40px);
  }
}
@media screen and (min-width: 960px) {
  .search-section {
    left: calc(25vw + 52px);
    right: calc(25vw + 40px);
    top: 50px;
  }
}
</style>
