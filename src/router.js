import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Login from './views/Auth/Login'
import Register from './views/Auth/Register'
import CoursesIndex from './views/courses/Index'
import CoursesShow from './views/courses/Show'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'

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
      path: '/Auth/Login',
      name: 'login',
      component: Login
    },

    {
      path: '/Auth/Register',
      name: 'register',
      component: Register
    },

    {
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },
    {
      path: '/courses/create',
      name: 'courses_create',
      component: CoursesCreate
    },
    {
      path: '/courses/:id',
      name: 'courses_show',
      component: CoursesShow
    },
    //
    {
      path: '/courses/:id/edit',
      name: 'courses_edit',
      component: CoursesEdit
    },
  ]
  });
