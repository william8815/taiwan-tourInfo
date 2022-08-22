import { apiHelper } from "@/utils/helpers";
export default{
  getActivity({area,select,filter,top,skip}){
    return apiHelper.get(`/Activity/${area}?${select}${filter}${top}${skip}%24format=JSON`)
  },
  getAllActivity({top,skip}){
    return apiHelper.get(`/Activity?${top}${skip}%24format=JSON`)
  }
}