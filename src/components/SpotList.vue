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
