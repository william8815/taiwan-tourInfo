<template>
  <div class="search-section">
    <div class="search p-3 mb-2 bg-white text-dark">
      <div class="search-result">
        <div v-if="isLoading"></div>
        <ul v-else class="result-list px-0">
          <li v-for="result in searchResult" :key="result.id" class="list-item">
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
    return {
      keyword,
      searchResult,
      top,
      skip,
      isLoading,
    };
  },
  created() {
    this.fetchSearchList(this.keyword);
  },
  computed: {
    ...mapState(["category"]),
  },
  methods: {
    fetchSearchList(keyword) {
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
    },
    async searchSpot(keyword) {
      try {
        this.isLoading = true;
        const { data } = await spotAPI.getAllSpot({
          filter: this.category
            ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
                `contains(ScenicSpotName, '${keyword}')`
              )}&`
            : "",
          top: `${encodeURIComponent("$")}top=${this.top}&`,
          skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
        });
        this.searchResult = data.map((result) => ({
          id: result.ScenicSpotID,
          name: result.ScenicSpotName,
          city: result.Address,
          picture: result.Picture ? result.Picture : {},
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async searchFood(keyword) {
      try {
        this.isLoading = true;
        const { data } = await foodAPI.getAllRestaurant({
          filter: this.category
            ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
                `contains(RestaurantName, '${keyword}')`
              )}&`
            : "",
          top: `${encodeURIComponent("$")}top=${this.top}&`,
          skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
        });
        this.searchResult = data.map((result) => ({
          id: result.RestaurantID,
          name: result.RestaurantName,
          city: result.Address,
          picture: result.Picture ? result.Picture : {},
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async searchHostel(keyword) {
      try {
        this.isLoading = true;
        const { data } = await hotelAPI.getAllHotel({
          filter: this.category
            ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
                `contains(HotelName, '${keyword}')`
              )}&`
            : "",
          top: `${encodeURIComponent("$")}top=${this.top}&`,
          skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
        });
        this.searchResult = data.map((result) => ({
          id: result.HotelID,
          name: result.HotelName,
          city: result.Address,
          picture: result.Picture ? result.Picture : {},
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async searchActivity(keyword) {
      try {
        this.isLoading = true;
        const { data } = await activityAPI.getAllActivity({
          filter: this.category
            ? `${encodeURIComponent("$")}filter=${encodeURIComponent(
                `contains(ActivityName, '${keyword}')`
              )}&`
            : "",
          top: `${encodeURIComponent("$")}top=${this.top}&`,
          skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
        });
        this.searchResult = data.map((result) => ({
          id: result.ActivityID,
          name: result.ActivityName,
          city: result.Address,
          picture: result.Picture ? result.Picture : {},
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
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
.search-section {
  position: absolute;
  left: 0;
  right: 0;
  top: 66px;
  z-index: 999;
  text-align: start;
}
.search-result {
  height: calc(100vh - 160px);
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
</style>