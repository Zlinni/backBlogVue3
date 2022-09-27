import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Home from "../components/Public/Home.vue";

const routes: Array<RouteRecordRaw> = [
  { 
    path: "/",
    name: "Home",
    component: Home,
    children:[
      {
        path:"/article",
        name:"Article",
        component:()=>import("../components/Management/Article.vue")
      },
      {
        path:"/draft",
        name:"Draft",
        component:()=>import("../components/Management/Draft.vue")
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
});

export default router;