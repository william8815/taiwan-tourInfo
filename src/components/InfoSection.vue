<template>
  <div class="info-section">
    <div class="title py-3">
      <i @click="$router.back()" class="fa-solid fa-arrow-left px-3"></i>
      <span>{{ info.name }}</span>
    </div>
    <div class="grid-layout">
      <!-- 圖片 -->
      <div class="image">
        <a href="#">
          <img
            :src="
              info.picture.PictureUrl1 ||
              'https://i.postimg.cc/nz9DxX0W/other-User.png'
            "
            alt=""
          />
        </a>
      </div>
      <div class="map-info">
        <!-- 地圖 -->
        <div class="map">
          <div id="map"></div>
        </div>
        <!-- 詳細資訊 -->
        <div class="information mt-2">
          <ul class="ps-0">
            <li>電話 : {{ info.phone }}</li>
            <li>地址 : {{ info.address }}</li>
            <li>開放時間 : {{ info.openTime }}</li>
          </ul>
        </div>
      </div>
      <!-- 描述 -->
      <div class="description">
        <h2 class="mt-2">介紹</h2>
        <p>{{ info.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";
import { ref } from "vue";
export default {
  props: {
    initial_info: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const info = ref({});
    return {
      info,
    };
  },
  created() {
    this.fetchInfo();
  },
  mounted() {
    this.fetchMap();
  },
  methods: {
    fetchInfo() {
      this.info = this.initial_info;
    },
    fetchMap() {
      let map = L.map("map", {
        zoomControl: false,
        attributionControl: false,
      }).setView(
        [this.info.position.PositionLat, this.info.position.PositionLon],
        17
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
        foo: "bar",
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      const customIcon = L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        iconSize: [25, 41],
      });
      L.marker(
        [this.info.position.PositionLat, this.info.position.PositionLon],
        {
          icon: customIcon,
        }
      ).addTo(map);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding: 1rem 0;
  font-size: 1.5rem;
  color: var(--font-color);
  font-weight: 700;
  border-bottom: 1px solid var(--font-color);
}
.image {
  width: 100%;
  height: 35vh;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease-in-out;
  }
  img:hover {
    transform: scale(1.2);
  }
}
.map-info {
  width: 100%;
  margin: 1rem 0;
  li {
    margin-bottom: 0.5rem;
  }
}
.map {
  width: 100%;
  height: 40vw;
  margin-right: 1rem;
  overflow: hidden;
  #map {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
@media screen and (min-width: 480px) {
  .info-section {
    margin-top: 265px;
    padding-bottom: 1rem;
  }
  .map-info {
    width: 100%;
    display: flex;
    margin: 1rem 0;
    li {
      margin-bottom: 0.5rem;
    }
  }
  .map {
    width: 35vw;
    height: 35vw;
    margin-right: 1rem;
    border-radius: 30px;
    overflow: hidden;
    #map {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .information {
    width: 50vw;
  }
}

@media screen and (min-width: 768px) {
  .info-section {
    margin-top: 255px;
  }
  .grid-layout {
    display: grid;
    grid-template-areas:
      "image description "
      "mapInfo description "
      "mapInfo description ";
    column-gap: 1rem;
  }
  .image {
    grid-area: image;
  }
  .description {
    grid-area: description;
    width: 100%;
  }
  .map-info {
    display: block;
    grid-area: mapInfo;
    border: 2px solid var(--main-color);
    border-radius: 30px;
    overflow: hidden;
    .information {
      margin: 1rem;
    }
  }
  .map {
    width: 100%;
    height: 25vw;
    margin-right: 0px;
    border-radius: 0;
  }
  .information {
    width: 90%;
  }
}
</style>
