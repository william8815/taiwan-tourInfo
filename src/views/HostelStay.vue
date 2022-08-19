<template>
<div class="container">
  <MainHead/>
  <h1>Hostel Stay</h1>
</div>
  
</template>

<script>
import MainHead from "./../components/MainHead.vue"
import hotelAPI from "./../apis/hotelStay"
import { mapState } from 'vuex' 
export default {
  components:{
    MainHead
  },
  data(){
    return{
      top:30,
      skip:0,
      selectName:"Class",
      category:"Class",
      categoryName:"一般旅館"
    }
  },
  computed: {
    ...mapState(['currentArea']),
    setArea(){
      return this.currentArea.enName
    }
  },
  created(){
    const{area} = this.$route.params
    this.fetchHotel(area)
  },
  methods:{
    async fetchHotel(area){
      const {data,statusText} = await hotelAPI.getHotel({
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
      if (route.name === "hostel-stay") {
        this.fetchHotel(route.params.area)
      }
    }
  }
}
</script>