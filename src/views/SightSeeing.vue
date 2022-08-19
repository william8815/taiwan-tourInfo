<template>
  <div class="container">
    <MainHeader/>
    <h1>sightseeing{{setArea}}</h1>
  </div>
</template>

<script>
import MainHeader from "../components/MainHead.vue"
import spotAPI from "./../apis/scenicSpot"
import { mapState } from 'vuex' 
const $ = require("jquery")
export default {
  components:{
    MainHeader
  },
  data(){
    return{
      top:30,
      skip:0,
      selectName:"Class1",
      category:"Class1",
      categoryName:"遊憩類"
    }
  },
  computed: {
    ...mapState(['currentArea']),
    setArea(){
      return this.currentArea.enName
    }
  },
  created(){
    this.GetAuthorizationHeader()
    const{area} = this.$route.params
    this.fetchSpot(area)
  },
  methods:{
    GetAuthorizationHeader () { 
      // 取金鑰資料
      const parameter = {
          grant_type:"client_credentials",
          client_id: "williamhsu88157976-944e828c-c2de-47ed",
          client_secret: "49a3b05b-dbac-4b8d-9cd1-a61c46c0ec6f"
      };
      // 取金鑰API
      const auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";   
      $.ajax({
          type: "POST",
          url: auth_url,
          crossDomain:true,
          dataType:'JSON',                
          data: parameter,
          async: false,       
          success: function(data){      
            // console.log(data.access_token)      
            localStorage.setItem('token',data.access_token)                            
          },
      });          
    },
    async fetchSpot(area){
      const {data,statusText} = await spotAPI.getSpot({
        area:area,
        select : `${encodeURIComponent('$')}select=${this.selectName}&`,
        filter : `${encodeURIComponent('$')}filter=${encodeURIComponent(`contains(${this.category}, '${this.categoryName}')`)}&`,
        top : `${encodeURIComponent('$')}top=${this.top}&`,
        skip : `${encodeURIComponent('$')}skip=${this.skip}&`
      })
      if (statusText === 'OK') {
        console.log('串接成功!!!')
      }
      console.log(data)
    }
  },
  watch:{
    $route (route) {
      if (route.name === "sightseeing-spot") {
      this.fetchSpot(route.params.area)
      }
    }
  }
}
</script>