import firebase from 'firebase'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/Index.vue'),
        meta: {
          protect: false
        }        
      }
    ]
  },
  {
    path: '/sign-in',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '', 
        component: () => import('pages/SignIn.vue'),
        meta: {
          protect: false
        }        
      }
    ]
  },
  {
    path: '/sign-up',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '', 
        component: () => import('pages/SignUp.vue'),
        meta: {
          protect: false
        }
      }
    ]
  },
  {
    path: '/notes',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '', 
        component: () => import('pages/notes.vue'),
        meta: {
          protect: true
        }
      }
    ]
  }    
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}


export default routes
