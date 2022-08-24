<template>
  <div v-if="spotSlide.length !== 0">
    <div
      id="carouselExampleCaptions"
      class="slide-box carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          v-for="spot in spotSlide"
          :key="spot.id"
          :class="{ active: spotSlide.indexOf(spot) === 0 }"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          :data-bs-slide-to="spotSlide.indexOf(spot)"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
      </div>
      <div class="carousel-inner">
        <!-- 輪播圖片 -->
        <div
          v-for="spot in spotSlide"
          :key="spot.id"
          :class="{ active: spotSlide.indexOf(spot) === 0 }"
          class="carousel-item"
        >
          <div class="image-box">
            <img
              :src="
                spot.picture.PictureUrl1 ||
                'https://i.postimg.cc/nz9DxX0W/other-User.png'
              "
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="text-box carousel-caption">
            <router-link
              :to="{
                name: `individual-${category.enTitle}`,
                params: { area: $route.params.area, id: spot.id },
              }"
            >
              <h3>{{ spot.name }}</h3>
              <p>{{ spot.address }}</p>
            </router-link>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div v-else class="text-center mt-3">
    <h2 class="mt-3">抱歉，目前無相關資料</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ref } from "vue";
export default {
  props: {
    spots: {
      type: Array,
    },
  },
  setup() {
    const spotSlide = ref([]);
    return {
      spotSlide,
    };
  },
  created() {
    this.fetchSlideSpot();
  },
  methods: {
    fetchSlideSpot() {
      this.spotSlide = this.spots;
    },
  },
  computed: {
    ...mapState(["category"]),
  },
};
</script>

<style lang="scss" scoped>
.slide-box {
  border-radius: 30px;
  box-shadow: 0px 3px 20px 2px #5b5b5b;
  overflow: hidden;
  margin-top: 225px !important;
}
.image-box {
  width: 100%;
  height: 45vw;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #333, $alpha: 0.5);
  }
}
.text-box {
  h3,
  p {
    color: #fff;
  }
}
// 平板
@media screen and (min-width: 480px) {
  .slide-box {
    margin-top: 265px !important;
  }
}
// PC
@media screen and (min-width: 960px) {
  .slide-box {
    margin-top: 235px !important;
    width: 60vw;
    margin: 0 auto;
  }
  .image-box {
    height: 50vh;
  }
}
</style>
