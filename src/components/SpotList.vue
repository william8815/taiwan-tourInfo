<template>
  <div v-if="spots.length !== 0" class="card-list mt-3">
    <div v-for="spot in spots" :key="spot.id" class="spot-card card mb-2">
      <div class="card-image">
        <router-link
          :to="{
            name: `individual-${category.enTitle}`,
            params: { area: $route.params.area, id: spot.id },
          }"
        >
          <img
            :src="filterImage(spot.picture.PictureUrl1)"
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
          <div class="badge-box">
            <span
              v-if="spot.class1"
              class="badge-item badge bg-secondary me-2 p-2 mb-1"
              ># {{ spot.class1 }}</span
            >
            <span
              v-if="spot.class2"
              class="badge-item badge bg-secondary me-2 p-2 mb-1"
              ># {{ spot.class2 }}</span
            >
            <span v-if="spot.class3" class="badge-item badge bg-secondary p-2"
              ># {{ spot.class3 }}</span
            >
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else class="text-center mt-3">
    <h2 class="mt-3">抱歉，目前無相關資料</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reactive } from "vue";
export default {
  name: "spotList",
  props: {
    cardList: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const spots = reactive([]);
    const spotAll = reactive([]);

    return {
      spots,
      spotAll,
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
  computed: {
    ...mapState(["category"]),
    filterImage() {
      return function (image) {
        return (
          image ||
          "https://i.postimg.cc/fyZnBVXy/pexels-tsang-chung-yee-669963.jpg"
        );
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.spot-card {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  overflow: hidden;
  padding: 0.5rem;
}
.spot-card:hover {
  box-shadow: 0px 3px 20px 2px #5b5b5b;
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
  background: var(--font-color) !important;
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
    max-height: 400px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .card-image {
    width: 100%;
    height: 20vh;
    min-height: 150px;
    max-height: 220px;
  }
}
// PC
@media screen and (min-width: 960px) {
}
</style>
