import { apiHelper } from "@/utils/helpers";
export default{
  getHotel({area,select,filter,top,skip}){
    return apiHelper.get(`/Hotel/${area}?${select}${filter}${top}${skip}%24format=JSON`)
  },
  getAllHotel({filter,top,skip}){
    return apiHelper.get(`/Hotel?${filter}${top}${skip}%24format=JSON`)
  }
}