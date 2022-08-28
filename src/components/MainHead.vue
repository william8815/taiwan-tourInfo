<template>
  <div ref="header" class="header mb-3">
    <div class="section">
      <!-- logo -->
      <div class="logo">
        <h1 class="p-2 mb-0">台灣 Fun 鬆玩</h1>
      </div>
      <!-- navbar -->
      <div class="nav-bar mb-2">
        <ul class="list nav justify-content-between align-items-center">
          <li v-for="tab in navTab" :key="tab.id" class="nav-item">
            <router-link
              :to="{
                name: tab.en_name,
                params: { area: currentArea.enName },
              }"
              :class="{
                active: $route.name === tab.en_name,
              }"
              class="nav-link"
              aria-current="page"
              href="#"
            >
              <i class="fa-solid" :class="tab.icon"></i>
              <span class="text">{{ tab.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div ref="switchBox" class="switch-box" :class="{ focus: inputFocus }">
      <!-- searchbar -->
      <div class="search" :class="{ focus: inputFocus }">
        <div
          class="search__box d-flex justify-content-center align-items-center"
        >
          <div class="search__title">
            <span>{{ category.title }}</span>
          </div>
          <input
            @focus="handleInputFocus"
            v-model="keyword"
            class="search__input"
            type="text"
            name="search"
            id=""
            :placeholder="'搜尋台灣' + category.title"
          />
          <div class="search__btn">
            <i
              v-if="inputFocus"
              @click="cleanKeyword"
              class="fa-solid fa-xmark"
            ></i>
            <i v-else class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <SearchPage v-if="inputFocus" :search_keyword="keyword" />
        <i
          v-if="inputFocus"
          @click="handleInputBlur"
          class="cancel-btn fa-solid fa-arrow-left"
        ></i>
      </div>
      <!-- selectbar -->
      <div v-if="!inputFocus" class="select my-2">
        <label for="area">請選擇區域 : </label>
        <select
          id="area"
          class="select-box form-select"
          aria-label="Default select example"
          v-model="enName"
          @change.stop.prevent="changeArea"
        >
          <option
            v-for="area in taiwanArea"
            :key="area.id"
            :value="area.en_name"
            name="option"
          >
            {{ area.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import SearchPage from "./../components/SearchPage.vue";
import { mapState } from "vuex";
import { reactive, ref } from "@vue/reactivity";
const taiwanSection = [
  {
    id: uuidv4(),
    name: "台北市",
    en_name: "Taipei",
  },
  {
    id: uuidv4(),
    name: "新北市",
    en_name: "NewTaipei",
  },
  {
    id: uuidv4(),
    name: "基隆市",
    en_name: "Keelung",
  },
  {
    id: uuidv4(),
    name: "桃園市",
    en_name: "Taoyuan",
  },
  {
    id: uuidv4(),
    name: "新竹市",
    en_name: "Hsinchu",
  },
  {
    id: uuidv4(),
    name: "新竹縣",
    en_name: "HsinchuCounty",
  },
  {
    id: uuidv4(),
    name: "苗栗縣",
    en_name: "MiaoliCounty",
  },
  {
    id: uuidv4(),
    name: "台中市",
    en_name: "Taichung",
  },
  {
    id: uuidv4(),
    name: "彰化縣",
    en_name: "ChanghuaCounty",
  },
  {
    id: uuidv4(),
    name: "南投縣",
    en_name: "NantouCounty",
  },
  {
    id: uuidv4(),
    name: "雲林縣",
    en_name: "YunlinCounty",
  },
  {
    id: uuidv4(),
    name: "嘉義市",
    en_name: "Chiayi",
  },
  {
    id: uuidv4(),
    name: "嘉義縣",
    en_name: "ChiayiCounty",
  },
  {
    id: uuidv4(),
    name: "台南市",
    en_name: "Tainan",
  },
  {
    id: uuidv4(),
    name: "高雄市",
    en_name: "Kaohsiung",
  },
  {
    id: uuidv4(),
    name: "屏東縣",
    en_name: "PingtungCounty",
  },
  {
    id: uuidv4(),
    name: "宜蘭縣",
    en_name: "YilanCounty",
  },
  {
    id: uuidv4(),
    name: "花蓮縣",
    en_name: "HualienCounty",
  },
  {
    id: uuidv4(),
    name: "台東縣",
    en_name: "TaitungCounty",
  },
  {
    id: uuidv4(),
    name: "澎湖縣",
    en_name: "PenghuCounty",
  },
  {
    id: uuidv4(),
    name: "金門縣",
    en_name: "KinmenCounty",
  },
  {
    id: uuidv4(),
    name: "連江縣",
    en_name: "LienchiangCounty",
  },
];
const navTabs = [
  {
    id: uuidv4(),
    name: "景點",
    en_name: "sightseeing-spot",
    icon: "fa-mountain-sun",
  },
  {
    id: uuidv4(),
    name: "美食",
    en_name: "tasty-food",
    icon: "fa-utensils",
  },
  {
    id: uuidv4(),
    name: "旅館",
    en_name: "hostel-stay",
    icon: "fa-bed",
  },
  {
    id: uuidv4(),
    name: "活動",
    en_name: "activity-fun",
    icon: "fa-hat-wizard",
  },
];
export default {
  components: {
    SearchPage,
  },
  setup() {
    const switchBox = ref(null);
    const header = ref(null);
    const prevScroll = ref(0);
    const keyword = ref("");
    const inputFocus = ref(false);
    const navTab = reactive([]);
    return {
      switchBox,
      header,
      prevScroll,
      keyword,
      inputFocus,
      navTab,
    };
  },
  data() {
    return {
      taiwanArea: [],
      enName: "",
      title: "",
    };
  },
  computed: {
    ...mapState(["currentArea", "category"]),
  },
  created() {
    this.fetchArea();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHide, true);
    this.changeArea();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scrollHide, true);
  },
  unmounted() {
    window.removeEventListener("scroll", this.scrollHide, true);
  },
  methods: {
    fetchArea() {
      this.taiwanArea = taiwanSection;
      this.navTab = navTabs;
      this.enName = this.$route.params.area;
      this.title = this.changeTitle(this.$route.name);
    },
    changeArea() {
      let area = this.taiwanArea.find((area) => area.en_name === this.enName);
      this.$store.commit("setCurrentArea", {
        name: area.name,
        enName: this.enName,
      });
      this.$router.push({
        name: this.$route.name,
        params: { area: this.enName },
      });
    },
    changeTitle(title) {
      switch (title) {
        case "sightseeing-spot":
          this.$store.commit("setCategoryTitle", {
            title: "景點",
            enTitle: "spot",
          });
          break;
        case "tasty-food":
          this.$store.commit("setCategoryTitle", {
            title: "美食",
            enTitle: "food",
          });
          break;
        case "hostel-stay":
          this.$store.commit("setCategoryTitle", {
            title: "旅館",
            enTitle: "hostel",
          });
          break;
        case "activity-fun":
          this.$store.commit("setCategoryTitle", {
            title: "活動",
            enTitle: "activity",
          });
          break;
        default:
          break;
      }
    },
    scrollHide() {
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll > this.prevScroll) {
        this.switchBox.classList.add("hight-line");
        this.header.classList.add("cut-height");
      } else {
        this.switchBox.classList.remove("hight-line");
        this.header.classList.remove("cut-height");
      }
      this.prevScroll = scroll;
    },
    handleInputFocus() {
      this.inputFocus = true;
    },
    handleInputBlur() {
      this.inputFocus = false;
      this.keyword = "";
    },
    cleanKeyword() {
      this.keyword = "";
    },
  },
  watch: {
    $route(route) {
      this.changeTitle(route.name);
    },
    keyword(value) {
      this.keyword = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  height: 205px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #fff;
  transition: height 0.4s ease-in-out;
  &.cut-height {
    height: 151px;
  }
}
.section {
  width: 100%;
  text-align: center;
  .logo {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
  }
}

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .list {
    width: 90%;
    height: 60px;
    padding: 0 10px;
    color: #a4a4a4;
    border-radius: 30px;
    margin: 0 auto;
    font-size: 1.25rem;
    background-color: #a4a4a4;
    box-shadow: 0px 3px 20px 2px #a4a4a4;
    a {
      display: inline-block;
      padding: 0;
      width: 40px;
      line-height: 40px;
      border: 1px solid #a4a4a4;
      border-radius: 50%;
    }
    i {
      color: #fff;
    }
    .text {
      color: #fff;
      font-weight: 700;
      display: none;
    }
    a.active {
      background-color: #fff;
    }
    a.active i,
    a.active .text {
      color: #333;
    }
  }
}
.switch-box {
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: #fff;
  border-bottom: 1px solid #fff;
  z-index: 999;
  padding: 1rem 0 !important;
  padding-bottom: 0 !important;
  &.hight-line {
    border-bottom: 1px solid #a4a4a4;
    transition: bottom 0.4s ease-in;
  }
  &.focus {
    position: fixed;
    top: 0;
  }
}

.select {
  text-align: center;
  .select-box {
    width: 50vw;
    margin: 0 auto;
  }
}
.search {
  text-align: center;
  position: relative;
  padding: 0 1rem !important;

  &__box {
    width: 90vw;
    margin: 0 auto;
    position: relative;
    border: 2px solid #a4a4a4;
    height: 50px;
    border-radius: 25px;
    background-color: #fff;
  }
  &__input {
    width: calc(100% - 100px);
    height: 46px;
    text-indent: 10px;
    border: none;
    outline: none;
  }
  &__btn {
    width: 40px;
    line-height: 40px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: #a4a4a4;
    color: #fff;
  }
  &__title {
    width: 60px;
    height: 50px;
    line-height: 50px;
    border-top-left-radius: 26px;
    border-bottom-left-radius: 26px;
    background-color: #a4a4a4;
    color: #fff;
  }
  &.focus {
    padding-top: 2rem !important;
  }
}
.cancel-btn {
  position: absolute;
  top: 0;
  left: 1rem;
  font-size: 1.25rem;
}
// 平板
@media screen and (min-width: 480px) {
  .header {
    height: 240px;
    &.cut-height {
      height: 137px;
    }
  }
  .section {
    text-align: center;
  }
  .nav-bar {
    top: 60px;
    height: 60px;
    .list {
      width: 95%;
      border: none;
      border-radius: 0;
      height: 50px;
      box-shadow: none;
      background-color: #fff;
      font-size: 1.25rem;
      a {
        display: inline;
        padding: 0.5rem 0.75rem;
        border: none;
      }
      i {
        color: #a4a4a4;
      }
      .text {
        display: inline-block;
        margin-left: 0.5rem;
        color: #a4a4a4;
      }
    }
  }
  .select {
    text-align: initial;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    .select-box {
      width: auto;
      margin: 0;
      margin-left: 20px;
    }
  }
}
@media screen and (min-width: 768px) {
  .search {
    &__box {
      width: 70vw;
    }
  }
  .cancel-btn {
    left: 10vw;
  }
}
// PC
@media screen and (min-width: 960px) {
  .header {
    height: 195px;
    border-bottom: 1px solid #a4a4a4;
    &.cut-height {
      height: 195px;
    }
  }
  .section {
    max-width: 1400px;
    margin: 0 auto;
    text-align: initial;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      position: static;
    }
  }
  .switch-box {
    all: unset;
    position: static;
    &.hight-line {
      all: unset;
    }
    &.focus {
      all: unset;
    }
  }
  .nav-bar {
    position: static;
    .list {
      width: 100%;
      line-height: 70px;
      li {
        margin-left: 0.5rem;
      }
    }
  }
  .search {
    &__box {
      width: 50vw;
      max-width: 1000px;
    }
    &.focus {
      padding-top: 0 !important;
    }
  }
  .cancel-btn {
    top: 50%;
    transform: translateY(-50%);
    left: 20vw;
  }
}
</style>
