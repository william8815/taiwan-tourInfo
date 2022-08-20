<template>
  <SlideSpot/>
</template>

<script>
import SlideSpot from "./../components/SlideSpot.vue" 
import spotAPI from "./../apis/scenicSpot"
export default {
  components:{
    SlideSpot
  },
  data(){
    return{
      spots:[]
    }
  },
  created(){
    this.fetchSlideSpot()
  },
  methods:{
    async fetchSlideSpot(){
      let top = 1
      let skip = 0
      for (let i=0 ; i<5; i++) {
        const {data} = await spotAPI.getAllSpot({
          top : `${encodeURIComponent('$')}top=${top}&`,
          skip :`${encodeURIComponent('$')}skip=${skip}&`
        })
        skip+=500
        this.spots.push(data[0])
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>