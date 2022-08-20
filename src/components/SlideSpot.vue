<template>
  <div id="carouselExampleCaptions" class="slide-box carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button v-for="spot in spots" :key="spot.ScenicSpotID" :class="{active:spots[0].ScenicSpotID === spot.ScenicSpotID}" type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="spots.indexOf(spot)" aria-current="true" aria-label="Slide 1"></button>
  </div>
  <div class="carousel-inner">
    <!-- 輪播圖片 -->
    <div v-for="spot in spots" :key="spot.ScenicSpotID" :class="{active:spots[0].ScenicSpotID === spot.ScenicSpotID}" class="carousel-item">
      <div class="image-box">
      <img :src="spot.Picture.PictureUrl1 || 'https://i.postimg.cc/nz9DxX0W/other-User.png'" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-caption ">
        <h2>{{spot.ScenicSpotName}}</h2>
        <p>{{spot.Address}}</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</template>

<script>
import spotAPI from "./../apis/scenicSpot"
export default {
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
.slide-box{
  border-radius: 30px;
  box-shadow: 0px 3px 20px 2px #5b5b5b;
  overflow: hidden;
}
.image-box{
  width: 100%;
  height: 40vw; 
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>