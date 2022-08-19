import { apiHelper } from "@/utils/helpers";
export default{
  getHotel({area,select,filter,top,skip}){
    return apiHelper.get(`/Hotel/${area}?${select}${filter}${top}${skip}%24format=JSON`)
  }
}