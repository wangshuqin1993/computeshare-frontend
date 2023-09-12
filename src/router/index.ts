// 路由
import { createRouter, createWebHistory } from "vue-router";
let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: '/dashboard/home',
      component: () => import('@/views/resource/home.vue'),
      children: [
        {
          path: "/dashboard/home",
          name: "Home",
          component: () => import('@/views/resource/index.vue'),
          meta: {
            sidebarMap: ['Resource'],
          }
        },
        {
          path: "/dashboard/resource",
          name: "Resource",
          component: () => import('@/views/resource/index.vue'),
          meta: {
            isShow: true,
            sidebarMap: ['Resource'],
          }
        },
        {
          path: "/dashboard/script",
          name: "Script",
          component: () => import('@/views/script/index.vue'),
          meta: {
            isShow: true,
            sidebarMap: ['Script'],
          }
        },
        {
          path: "/dashboard/storage",
          name: "Storage",
          component: () => import('@/views/storage/index.vue'),
          meta: {
            isShow: true,
            sidebarMap: ['Storage'],
          }
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/views/login/index.vue'),
    }
  ],
  // 每次切换路由页面滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  }
});

export default router;