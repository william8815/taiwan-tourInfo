import { apiHelper } from "@/utils/helpers";
export default {
  getActivity({ area, select, filter, orderby, top, skip }) {
    return apiHelper.get(
      `/Activity/${area}?${select}${filter}${orderby}${top}${skip}%24format=JSON`
    );
  },
  getAllActivity({ filter, top, skip }) {
    return apiHelper.get(`/Activity?${filter}${top}${skip}%24format=JSON`);
  },
};
