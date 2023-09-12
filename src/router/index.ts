// 路由
import { createRouter, createWebHistory } from "vue-router";
let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: '/dashboard/home',
      children: [
        {
          path: "/dashboard/home",
          name: "Home",
          component: () => import('@/views/resource/home.vue'),
          meta: {
            sidebarMap: ['云服务器'],
          }
        },
        {
          path: "/dashboard/resource",
          name: "Resource",
          component: () => import('@/views/resource/index.vue'),
          meta: {
            isShow: true,
          }
        },
        {
          path: "/dashboard/script",
          name: "Script",
          component: () => import('@/views/script/index.vue'),
          meta: {
            isShow: true,
          }
        },
        {
          path: "/dashboard/storage",
          name: "Storage",
          component: () => import('@/views/storage/index.vue'),
          meta: {
            isShow: true,
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