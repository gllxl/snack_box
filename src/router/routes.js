const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {path: '/', component: () => import('pages/Index.vue')}
    ]
  }, {
    path: '/order',
    component: () => import('layouts/OrderLayout.vue'),
    children: [
      {path: '/order', component: () => import('pages/OrderList.vue')},
    ]
  }, {
    path: '/author',
    component: () => import('layouts/WhiteLayout.vue'),
    children: [
      {path: '/author', component: () => import('pages/Author.vue')}
    ]
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
