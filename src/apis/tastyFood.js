import { apiHelper } from "@/utils/helpers";
export default{
  getRestaurant({area,select,filter,top,skip}){
    return apiHelper.get(`/Restaurant/${area}?${select}${filter}${top}${skip}%24format=JSON`)
  },
  getAllRestaurant({filter,top,skip}){
    return apiHelper.get(`/Restaurant?${filter}${top}${skip}%24format=JSON`)
  },
}