<template>
  <div class="container">
    <div v-if="isLoading">...Loading</div>
    <InfoSection v-else :initial_info="hostel" />
    <h2>更多旅館 :</h2>
    <div v-if="isMoreLoading">...Loading</div>
    <MoreSection v-else :more_spot="moreSpot" />
  </div>
</template>

<script>
import InfoSection from "../components/InfoSection.vue";
import MoreSection from "./../components/MoreSection.vue";
import hotelAPI from "./../apis/hotelStay";
import { ref, reactive } from "vue";
export default {
  components: {
    InfoSection,
    MoreSection,
  },
  setup() {
    const top = ref(1);
    const skip = ref(0);
    const hostel = reactive({
      id: -1,
      address: "",
      class1: "",
      class2: "",
      class3: "",
      description: "",
      openTime: "",
      phone: "",
      picture: {},
      position: "",
      name: "",
    });
    const moreHostel = reactive([]);
    const isLoading = ref(false);
    const isMoreLoading = ref(false);
    return {
      top,
      skip,
      hostel,
      isLoading,
      moreHostel,
      isMoreLoading,
    };
  },
  created() {
    this.fetchOneHostel();
    this.fetchMoreHotel();
  },
  methods: {
    async fetchOneHostel() {
      this.isLoading = true;
      const { data, statusText } = await hotelAPI.getAllHotel({
        filter: `${encodeURIComponent("$")}filter=${encodeURIComponent(
          `contains(HotelID, '${this.$route.params.id}')`
        )}&`,
        top: `${encodeURIComponent("$")}top=${this.top}&`,
        skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
      });
      if (statusText === "OK") {
        console.log("串接成功!!!");
      }
      this.hostel = {
        id: data[0].HotelID,
        address: data[0].Address ? data[0].Address : "",
        class1: data[0].Class ? data[0].Class : "",
        class2: "",
        class3: "",
        description: data[0].Description,
        openTime: data[0].OpenTime,
        phone: data[0].Phone,
        picture: data[0].Picture ? data[0].Picture : {},
        position: data[0].Position,
        name: data[0].HotelName,
        spec: data[0].Spec ? data[0].Spec : "",
        service: data[0].ServiceInfo ? data[0].ServiceInfo : "",
        website: data[0].WebsiteUrl ? data[0].WebsiteUrl : "",
      };
      this.isLoading = false;
    },
    async fetchMoreHotel() {
      this.isMoreLoading = true;
      const { data, statusText } = await hotelAPI.getAllHotel({
        filter: "",
        top: `${encodeURIComponent("$")}top=${10}&`,
        skip: `${encodeURIComponent("$")}skip=${this.skip}&`,
      });
      if (statusText === "OK") {
        console.log("串接成功!!!");
      }
      this.moreSpot = data.map((spot) => {
        return {
          id: spot.HotelID,
          address: spot.Address ? spot.Address : "",
          class1: spot.Class ? spot.Class : "",
          class2: "",
          class3: "",
          description: spot.Description,
          openTime: spot.OpenTime,
          phone: spot.Phone,
          picture: spot.Picture ? spot.Picture : {},
          position: spot.Position,
          name: spot.HotelName,
        };
      });
      this.moreSpot = this.moreSpot.filter(
        (spot) => spot.id !== this.$route.params.id
      );
      this.isMoreLoading = false;
    },
  },
};
</script>
