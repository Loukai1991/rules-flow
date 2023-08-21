import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Layouts = () => import("@/layouts/index.vue")

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
    {
      path: '/',
      component: Layouts,
      redirect: "/flowchart",
      children: [
        {
          path: "flowchart",
          component: () => import("@/views/flow/Index.vue"),
          name: "flowchart",
          meta: {
            title: "规则引擎",
            svgIcon: "dashboard",
            // affix: true
          }
        }
      ]
    },
    {
      path: '/error',
      component: () => import("@/views/error/404.vue")
    }
  ]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
  })
  export default router