import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import tianjiagouwuche from '@/components/tianjiagouwuche.vue'
import shangping from '@/components/shangping'
import Denlu from '@/components/Denlu'
import cuowu from '@/components/404.vue'
import adminlogin from '@/components/adminlogin.vue'
import Gouwuche from '@/components/Gouwuche.vue'
import search from '@/components/search.vue'
import Yonghuzhuce from '@/components/Yonghuzhuce.vue'
import Houtai from '@/views/Houtai.vue'
import uselogin from '@/components/uselogin.vue'
import Gerenxinxi from '@/components/Gerenxinxi.vue'
import Admin from '@/views/Admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/user/tianjiagouwuche',
      name: 'tianjiagouwuche',
      component: tianjiagouwuche
    },
    {
      path: '/Gerenxinxi',
      name: 'Gerenxinxi',
      component: Gerenxinxi
    },

    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/user/shangping',
      name: 'shangping',
      component: shangping
    },
    {
      path: '/Yonghuzhuce',
      name: 'Yonghuzhuce',
      component:Yonghuzhuce
    },
    {
      path: '/uselogin',
      name: 'uselogin',
      component: uselogin
    },
    {
      path: '/Denlu',
      name: 'Denlu',
      component: Denlu
    },

    {
      path: '/tianjiagouwuche',
      name: 'tianjiagouwuche',
      component: tianjiagouwuche
    },
    {
      path: '/Gouwuche',
      name: 'Gouwuche',
      component: Gouwuche
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: adminlogin
    },
    {
      path: '/Houtai',
      name: 'Houtai',
      component:Houtai
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: "/404",
      name: "cuowu",
      component: cuowu
    }, {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404"

    }
  ]
})
