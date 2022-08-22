<template>
  <div class="card-list d-flex">
    <div
      v-for="spot in moreSpot"
      :key="spot.id"
      class="spot-card card bg-dark text-white"
    >
      <img
        src="https://i.postimg.cc/nz9DxX0W/other-User.png"
        class="card-img"
        alt="..."
      />
      <router-link
        :to="{
          name: 'individual-spot',
          params: { area: $route.params.area, id: spot.id },
        }"
      >
        <div class="card-img-overlay">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">Last updated 3 mins ago</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";

export default {
  props: {
    more_spot: {
      type: Array,
    },
  },
  setup() {
    const moreSpot = reactive([]);
    return {
      moreSpot,
    };
  },
  created() {
    this.fetchMoreSpot();
  },
  methods: {
    fetchMoreSpot() {
      this.moreSpot = this.more_spot;
      console.log(this.moreSpot);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-list {
  overflow-x: auto;
  white-space: nowrap;
  --webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
.spot-card {
  width: 30vw;
  height: 150px;
}
</style>
