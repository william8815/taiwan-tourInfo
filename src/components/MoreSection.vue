<template>
  <div class="card-list scrollbar">
    <div
      v-for="spot in moreSpot"
      :key="spot.id"
      class="spot-card card bg-dark text-white"
    >
      <div class="image">
        <router-link
          :to="{
            name: 'individual-spot',
            params: { area: $route.params.area, id: spot.id },
          }"
        >
          <img
            :src="filterImage(spot.picture.PictureUrl1)"
            class="card-img"
            alt="..."
          />
        </router-link>
      </div>
      <router-link
        :to="{
          name: 'individual-spot',
          params: { area: $route.params.area, id: spot.id },
        }"
      >
        <div class="content">
          <h5 class="card-title">{{ spot.name }}</h5>
          <p class="card-text">{{ spot.city }}</p>
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
    },
  },
  computed: {
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
// 取消滾輪
::-webkit-scrollbar {
  /* make scrollbar transparent */
  width: 0px;
  background: transparent;
}
.scrollbar {
  padding-bottom: 6px;

  // 整體的樣式
  &::-webkit-scrollbar {
    height: 6px;
  }

  // bar的樣式
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: var(--font-color);
  }
}
.card-list {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
}
.spot-card {
  width: 20vh;
  flex-shrink: 0;
  margin-right: 0.5rem;
  text-align: center;
  border: none;
  border-radius: 15px;
  overflow: hidden;
  .image {
    width: 100%;
    height: 15vh;
    overflow: hidden;
    position: relative;
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
  .content {
    color: #fff;
    padding: 0.5rem 0;
    h5 {
      font-size: 0.75rem;
      color: var(--spot-background);
    }
  }
}
</style>
