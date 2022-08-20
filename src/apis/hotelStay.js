import { apiHelper } from "@/utils/helpers";
export default{
  getHotel({area,select,filter,top,skip}){
    return apiHelper.get(`/Hotel/${area}?${select}${filter}${top}${skip}%24format=JSON`)
  },
  getAllHotel({select,filter,top,skip}){
    return apiHelper.get(`/Hotel?${select}${filter}${top}${skip}%24format=JSON`)
  }
}