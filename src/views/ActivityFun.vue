<template>
  <div class="container">
    <MainHead/>
    <h1>Activity Fun</h1>
  </div>
</template>

<script>
import MainHead from "./../components/MainHead.vue"
import ActivityAPI from "./../apis/activityFun"
import { mapState } from 'vuex' 
export default {
  components:{
    MainHead
  },
  data(){
    return{
      top:30,
      skip:0,
      selectName:"Class1",
      category:"Class1",
      categoryName:"節慶活動"
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
    this.fetchActivity(area)
  },
  methods:{
    async fetchActivity(area){
      const {data,statusText} = await ActivityAPI.getActivity({
        area: area,
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
      if (route.name === "activity-fun") {
        this.fetchActivity(route.params.area)
      }
    }
  }
}
</script>