// 路由
import { createRouter, createWebHistory } from "vue-router";
let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: '/dashboard/resource',
      component: () => import('@/views/home/index.vue'),
      children: [
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
        {
          path: "/dashboard/user",
          name: "User",
          component: () => import('@/views/user/index.vue'),
          meta: {
            isShow: true,
            sidebarMap: ['User'],
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: "/system",
      name: "system",
      component: () => import('@/views/resource/system.vue')
    }
  ],
  // 每次切换路由页面滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  }
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || '';
  // 如果用户已登录
  if (token) {
    // 访问登录页则跳回首页
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      // 如果访问其他页面则放行
      next();
    }
  } else { // 如果用户未登录
    if (to.path == "/login") {
      next();
    } else {
      // 如果访问其他页面则返回登录界面
      next({ path: "/login" });
    }
  }
})

export default router;