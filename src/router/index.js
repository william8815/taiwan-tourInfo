import { createRouter, createWebHashHistory } from "vue-router";
import SightSeeing from "./../views/SightSeeing";

const routes = [
  {
    path: "/",
    name: "main",
    redirect: { path: "/spot/Taipei" },
  },
  {
    path: "/spot/:area",
    name: "sightseeing-spot",
    component: SightSeeing,
  },
  {
    path: "/spot/individual/:id",
    name: "individual-spot",
    component: () => import("./../views/IndividualSpot.vue"),
  },
  {
    path: "/food/:area",
    name: "tasty-food",
    component: () => import("./../views/TastyFood.vue"),
  },
  {
    path: "/food/individual/:id",
    name: "individual-food",
    component: () => import("./../views/IndividualFood.vue"),
  },
  {
    path: "/hostel/:area",
    name: "hostel-stay",
    component: () => import("./../views/HostelStay.vue"),
  },
  {
    path: "/hostel/individual/:id",
    name: "individual-hostel",
    component: () => import("./../views/IndividualHostel.vue"),
  },
  {
    path: "/activity/:area",
    name: "activity-fun",
    component: () => import("./../views/ActivityFun.vue"),
  },
  {
    path: "/activity/individual/:id",
    name: "individual-activity",
    component: () => import("./../views/IndividualActivity.vue"),
  },
  {
    path: "/search/:category",
    name: "search-page",
    component: () => import("./../views/SearchBar.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("./../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
