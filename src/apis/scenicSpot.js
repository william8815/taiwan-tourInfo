import { apiHelper } from "@/utils/helpers";
export default{
  getSpot({area,select,filter,top,skip}){
    console.log(`/ScenicSpot/${area}?${select}${filter}${top}${skip}%24format=JSON`)
    return apiHelper.get(`/ScenicSpot/${area}?${select}${filter}${top}${skip}%24format=JSON`)
  },
  getAllSpot({top,skip}){
    return apiHelper.get(`/ScenicSpot?${top}${skip}%24format=JSON`)
  }
}