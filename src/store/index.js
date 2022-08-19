import { createStore } from 'vuex'

export default createStore({
  state: {
    currentArea:{
      name:"台北市",
      enName:"Taipei"
    },
    categoryTitle:"景點"
  },
  getters: {
  },
  mutations: {
    setCurrentArea(state,currentArea){
      state.currentArea = {
        ...state.currentArea,
        ...currentArea
      }
    },
    setCategoryTitle(state,categoryTitle){
      state.categoryTitle = categoryTitle
    }
  },
  actions: {
  },
  modules: {
  }
})
