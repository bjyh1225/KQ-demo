export default [
  {
    path: '/',
    component: () => import('pages/Index/Index'),
    children: [],
    redirect: "/index"
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login/Login'),
    meta: {
      "title": "webTitle.login",
      "needI18N": true
    }
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('pages/Error/Error404'),
    meta: {
      "title": "webTitle.error404",
      "needI18N": true
    }
  },
  {    
    path: '/test',
    name: 'test',
    component: () => import('pages/Test/Test'),
    meta: { 
    }
  },
  {    
    path: '/guide',
    name: '/guide',
    component: () => import('portal/independentModules/guide/GuideIndex'),
    meta: { 
    }
  }
]