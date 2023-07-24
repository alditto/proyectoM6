import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/libros',
    name: 'libros',
    component: () => import(/* webpackChunkName: "libros" */ '../views/LibrosView.vue')
  },
  {
    path: '/libros/:id',
    name: 'librosedit',
    component: () => import(/* webpackChunkName: "librosedit" */ '../views/LibrosEditView.vue')
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: () => import(/* webpackChunkName: "categorias" */ '../views/CategoriasView.vue')
  },
  {
    path: '/categorias/:id',
    name: 'categoriasedit',
    component: () => import(/* webpackChunkName: "categoriasedit" */ '../views/CategoriasEditView.vue')
  },
{
  path: '/paises',
  name: 'paises',
  component: () => import(/* webpackChunkName: "paises" */ '../views/PaisesView.vue')
},
{
  path: '/paises/:id',
  name: 'paisesedit',
  component: () => import(/* webpackChunkName: "paisesedit" */ '../views/PaisesEditView.vue')
},
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
