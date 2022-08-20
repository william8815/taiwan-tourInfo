<template>
  <SlideSpot />
  <div class="card-list mt-3">
    <div
      v-for="spot in spots"
      :key="spot.ScenicSpotID"
      class="spot-card card mb-2"
    >
      <div class="card-image">
        <img
          :src="
            spot.Picture.PictureUrl1 ||
            'https://i.postimg.cc/nz9DxX0W/other-User.png'
          "
          class="card-img-top"
          :alt="spot.ScenicSpotName"
        />
      </div>
      <div class="spot-body card-body">
        <h3 class="card-title">{{ spot.ScenicSpotName }}</h3>
        <p class="card-text">{{ spot.City }}</p>
        <div class="badge-box">
          <span
            v-if="spot.Class1"
            class="badge-item badge bg-secondary me-2 p-2 mb-1"
            ># {{ spot.Class1 }}</span
          >
          <span
            v-if="spot.Class2"
            class="badge-item badge bg-secondary me-2 p-2 mb-1"
            ># {{ spot.Class2 }}</span
          >
          <span v-if="spot.Class3" class="badge-item badge bg-secondary p-2"
            ># {{ spot.Class3 }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlideSpot from "./../components/SlideSpot.vue";
// import spotAPI from "./../apis/scenicSpot";
export default {
  components: {
    SlideSpot,
  },
  props: {
    cardList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      spots: [],
    };
  },
  created() {
    this.fetchSlideSpot();
  },
  methods: {
    fetchSlideSpot() {
      this.spots = this.cardList;
    },
  },
};
</script>

<style lang="scss" scoped>
.spot-card {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 18vh;
  overflow: hidden;
  padding: 0.5rem;
}
.card-image {
  width: 30vw;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.badge-item {
  font-size: 0.5rem;
}
// 平板
@media screen and (min-width: 768px) {
  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: auto;
    gap: 0.75rem;
  }
  .spot-card {
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
}
</style>
