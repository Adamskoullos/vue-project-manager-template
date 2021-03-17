import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import NewProject from '@/views/projects/NewProject.vue'
import Projects from '@/views/projects/Projects.vue'
import ProjectDetails from '@/views/projects/ProjectDetails.vue'

import { fAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  const user = fAuth.currentUser
  if(!user){
    next({ name: 'Home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/projects/new',
    name: 'NewProject',
    component: NewProject,
    beforeEnter: requireAuth
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    beforeEnter: requireAuth
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetails',
    component: ProjectDetails,
    beforeEnter: requireAuth,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
