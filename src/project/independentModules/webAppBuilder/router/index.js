import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes:[
    {
      path: '/',
      component: () => import('../pages/Index'),
      children: []
    },
    {
      path: '/test',
      component: () => import('../pages/Test'),
      children: []
    }
  ]
});

export default router