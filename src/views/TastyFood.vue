<template>
<div class="container">
  <MainHead/>
  <h1>Tasty Food</h1>
</div>
  
</template>

<script>
import MainHead from "./../components/MainHead.vue"
import foodAPI from "./../apis/tastyFood"
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
      categoryName:"異國料理"
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
    this.fetchRestaurant(area)
  },
  methods:{
    async fetchRestaurant(area){
      const {data,statusText} = await foodAPI.getRestaurant({
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
      if (route.name === "tasty-food") {
      this.fetchRestaurant(route.params.area)
      }
    }
  }
}
</script>