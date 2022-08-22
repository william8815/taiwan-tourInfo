import { createStore } from 'vuex'

export default createStore({
  state: {
    currentArea:{
      name:"台北市",
      enName:"Taipei"
    },
    category:{
      title:"景點",
      enTitle:"spot"
    }
    // categoryTitle:"景點",
    // categoryEnTitle:"spot"
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
    setCategoryTitle(state,category){
      state.category = {
        ...state.category,
        ...category
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
