import { createRouter, createWebHashHistory } from 'vue-router'
import SightSeeing from "./../views/SightSeeing"

const routes = [
  {
    path: '/',
    name:'main',
    redirect: { name: 'sightseeing-spot' }
  },
  {
    path: '/spot/:area',
    name: 'sightseeing-spot',
    component : SightSeeing
  },
  {
    path: '/food/:area',
    name: 'tasty-food',
    component : ()=>import('./../views/TastyFood.vue')
  },
  {
    path: '/hostel/:area',
    name: 'hostel-stay',
    component : ()=>import('./../views/HostelStay.vue')
  },
  {
    path: '/activity/:area',
    name: 'activity-fun',
    component : ()=>import('./../views/ActivityFun.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import("./../views/NotFound.vue")
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
