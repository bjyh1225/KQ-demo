/*基础路由*/
export default [
  {
    path: '/',
    name:"Base",
    component: () => import('pages/Index/Index'),
    children: [],
    redirect: "/index"
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login/Login')
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('pages/Error/Error404')
  },
  {    
    path: '/test',
    name: 'test',
    component: () => import('pages/Test/Test')
  },
  {    
    path: '/guide',
    name: 'guide',
    component: () => import('portal/independentModules/guide/GuideIndex')
  },
  {
    path: '/helpcenter',
    name: 'helpCenter',
    component: () => import('portal/independentModules/helpCenter/HelpCenter'),
  },
  {
    path: '/routerTool',
    name: 'routerTool',
    component: () => import('pages/Tool/RouterTool'),
  },
  {
    path: '/noAuthority',
    name: 'noAuthority',
    component: () => import('pages/Error/ErrorNoAuthority'),
  }
]