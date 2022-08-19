<template>
  <div class="header">
    <div class="section mt-3">
      <!-- logo -->
      <div class="logo">
        <h1>台灣 Fun 鬆玩</h1>
      </div>
      <!-- navbar -->
      <div class="nav-bar mb-2">
        <ul class="list nav justify-content-between align-items-center">
          <li class="nav-item">
            <router-link :to="{name:'sightseeing-spot', params: { area: currentArea.enName },}" :class="{active:$route.name === 'sightseeing-spot'}" class="nav-link" aria-current="page" href="#">
              <i class="fa-solid fa-mountain-sun"></i> 
              <span class="text">景點</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'tasty-food'}" :class="{active:$route.name === 'tasty-food',params: { area: currentArea.enName },}" class="nav-link" href="#">
              <i class="fa-solid fa-utensils"></i>
              <span class="text">美食</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link  :to="{name:'hostel-stay',params: { area: currentArea.enName },}" :class="{active:$route.name === 'hostel-stay'}" class="nav-link" href="#">
              <i class="fa-solid fa-bed"></i>
              <span class="text">住宿</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'activity-fun',params: { area: currentArea.enName },}" :class="{active:$route.name === 'activity-fun'}" class="nav-link" href="#">
              <i class="fa-solid fa-hat-wizard"></i>
              <span class="text">活動</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- selectbar -->
    <div class="select my-2">
      <label for="area">請選擇區域 : </label>
      <select id="area" class="select-box form-select" aria-label="Default select example"  v-model="enName" @change.stop.prevent="changeArea"> 
        <option v-for="area in taiwanArea" :key="area.id" :value="area.en_name" name="option">
            {{area.name}}
        </option>
      </select>
    </div>
    <!-- searchbar -->
    <div class="search my-3">
      <div class="search__box d-flex justify-content-center align-items-center">
        <div class="search__title">
          <span>{{categoryTitle}}</span>
        </div>
        <input class="search__input" type="text" name="search" id="" :placeholder="'搜尋相關'+ categoryTitle" autofocus>
        <div class="search__btn">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'vuex'
const taiwanSection = [
  {
    id:uuidv4(),
    name: '台北市',
    en_name : "Taipei"
  },
  {
    id:uuidv4(),
    name: '新北市',
    en_name : "NewTaipei"
  },
  {
    id:uuidv4(),
    name: '基隆市',
    en_name : "Keelung"
  },
  {
    id:uuidv4(),
    name: '桃園市',
    en_name : "Taoyuan"
  },
  {
    id:uuidv4(),
    name: '新竹市',
    en_name : "Hsinchu"
  },
  {
    id:uuidv4(),
    name: '新竹縣',
    en_name : "HsinchuCounty"
  },
  {
    id:uuidv4(),
    name: '苗栗縣',
    en_name : "MiaoliCounty"
  },
  {
    id:uuidv4(),
    name: '台中市',
    en_name : "Taichung"
  },
  {
    id:uuidv4(),
    name: '彰化縣',
    en_name : "ChanghuaCounty"
  },
  {
    id:uuidv4(),
    name: '南投縣',
    en_name : "NantouCounty"
  },
  {
    id:uuidv4(),
    name: '雲林縣',
    en_name : "YunlinCounty"
  },
  {
    id:uuidv4(),
    name: '嘉義市',
    en_name : "Chiayi"
  },
  {
    id:uuidv4(),
    name: '嘉義縣',
    en_name : "ChiayiCounty"
  },
  {
    id:uuidv4(),
    name: '台南市',
    en_name : "Tainan"
  },
  {
    id:uuidv4(),
    name: '高雄市',
    en_name : "Kaohsiung"
  },
  {
    id:uuidv4(),
    name: '屏東縣',
    en_name : "PingtungCounty"
  },
  {
    id:uuidv4(),
    name: '宜蘭縣',
    en_name : "YilanCounty"
  },
  {
    id:uuidv4(),
    name: '花蓮縣',
    en_name : "HualienCounty"
  },
  {
    id:uuidv4(),
    name: '台東縣',
    en_name : "TaitungCounty"
  },
  {
    id:uuidv4(),
    name: '澎湖縣',
    en_name : "PenghuCounty"
  },
  {
    id:uuidv4(),
    name: '金門縣',
    en_name : "KinmenCounty"
  },
  {
    id:uuidv4(),
    name: '連江縣',
    en_name : "LienchiangCounty"
  }
]
export default {
  data(){
    return{
      taiwanArea:[],
      enName:"",
      title:""
    }
  },
  computed: {
    ...mapState(['currentArea','categoryTitle']),
  },
  created(){
    this.fetchArea()
  },
  methods:{
    fetchArea(){
      this.taiwanArea = taiwanSection
      this.enName = this.$route.params.area
      this.changeArea()
      this.title = this.changeTitle(this.$route.name)
    },
    changeArea(){
      let area = this.taiwanArea.find((area)=> area.en_name === this.enName)
      this.$store.commit('setCurrentArea',{name: area.name,enName:this.enName} )
      this.$router.push({ name: this.$route.name, params: { area: this.enName} })
    },
    changeTitle(title){
      switch (title) {
        case "sightseeing-spot":
          this.$store.commit('setCategoryTitle', "景點")
          break;
        case "tasty-food":
          this.$store.commit('setCategoryTitle', "美食")
          break;
        case "hostel-stay":
          this.$store.commit('setCategoryTitle', "住宿")
          break;
        case "activity-fun":
          this.$store.commit('setCategoryTitle', "活動")
          break;
        default:
          break;
      }
    }
  },
  watch:{
    $route () {
      this.changeTitle(this.$route.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  width: 100%;
  text-align: center;
}
.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .list {
    width: 85%;
    height: 60px;
    padding: 0 10px;
    border: 1px solid #a4a4a4;
    color: #a4a4a4;
    border-radius: 30px;
    margin: 0 auto;
    font-size: 1.25rem;
    a{
      display: inline-block;
      padding: 0;
      width: 40px;
      line-height: 40px;
      border: 1px solid #a4a4a4;
      border-radius: 50%;
    }
    i{
      color: #a4a4a4;
    }
    .text{
      color: #a4a4a4;
      font-weight: 700;
      display: none;
    }
    a.active i,
    a.active .text{
      color:#333
    }
  }
}
.select {
  text-align: center;
  .select-box{
    width: 50vw;
    margin: 0 auto;
  }
}
.search {
  text-align: center;
  &__box{
    width: 70vw;
    margin: 0 auto;
    position: relative;
    border:2px solid #a4a4a4;
    height: 50px;
    border-radius: 25px;
  }
  &__input{
    width:calc(100% - 100px);
    height: 46px;
    text-indent: 10px;
    border:none;
    outline: none;
  }
  &__btn{
    width: 40px;
    line-height: 40px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: #a4a4a4;
    color: #fff;
  }
  &__title{
    width: 60px;
    height: 50px;
    line-height: 50px;
    border-top-left-radius: 26px;
    border-bottom-left-radius: 26px;
    margin-left: 0px;
    background-color: #a4a4a4;
    color: #fff;
  }
}
// 平板
@media screen and (min-width: 480px) {
  .section {
    text-align: center;
  }
  .nav-bar {
    position: static;
    margin-bottom: 0 !important;
    .list {
      width: 100%;
      border:none;
      height: 50px;
      a{
        display: inline;
        padding: .5rem 1rem;
        border: none;
      }
      .text{
        display: inline-block;
        margin-left: .5rem;
      }
    }
  }
  .select {
    text-align: initial;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80vw;
    margin:0 auto;
    .select-box{
      width: auto;
      margin : 0;
      margin-left: 20px;
    }
  }
}
// PC
@media screen and (min-width: 960px) {
  .section {
    max-width: 1400px;
    text-align: initial;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-bar {
    position: static;
    .list {
      width: 100%;
      li{
        margin-left: .5rem;
      }
    }
  }
}
</style>
