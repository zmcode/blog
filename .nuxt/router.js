import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _980e44de = () => interopDefault(import('..\\pages\\contribute\\index.vue' /* webpackChunkName: "pages_contribute_index" */))
const _1b93ba16 = () => interopDefault(import('..\\pages\\draft\\index.vue' /* webpackChunkName: "pages_draft_index" */))
const _e5b69ace = () => interopDefault(import('..\\pages\\essay\\index.vue' /* webpackChunkName: "pages_essay_index" */))
const _4c767fa6 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages_login_index" */))
const _267a5d76 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages_search_index" */))
const _19059d6b = () => interopDefault(import('..\\pages\\shorthand\\index.vue' /* webpackChunkName: "pages_shorthand_index" */))
const _56b991f7 = () => interopDefault(import('..\\pages\\write\\index.vue' /* webpackChunkName: "pages_write_index" */))
const _153b352c = () => interopDefault(import('..\\pages\\learn\\article\\index.vue' /* webpackChunkName: "pages_learn_article_index" */))
const _43a0d02a = () => interopDefault(import('..\\pages\\setting\\password\\index.vue' /* webpackChunkName: "pages_setting_password_index" */))
const _28cc4df1 = () => interopDefault(import('..\\pages\\setting\\person\\index.vue' /* webpackChunkName: "pages_setting_person_index" */))
const _34d43df2 = () => interopDefault(import('..\\pages\\home\\_id.vue' /* webpackChunkName: "pages_home__id" */))
const _2757e666 = () => interopDefault(import('..\\pages\\post\\_id.vue' /* webpackChunkName: "pages_post__id" */))
const _6d8228c4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/contribute",
    component: _980e44de,
    name: "contribute"
  }, {
    path: "/draft",
    component: _1b93ba16,
    name: "draft"
  }, {
    path: "/essay",
    component: _e5b69ace,
    name: "essay"
  }, {
    path: "/login",
    component: _4c767fa6,
    name: "login"
  }, {
    path: "/search",
    component: _267a5d76,
    name: "search"
  }, {
    path: "/shorthand",
    component: _19059d6b,
    name: "shorthand"
  }, {
    path: "/write",
    component: _56b991f7,
    name: "write"
  }, {
    path: "/learn/article",
    component: _153b352c,
    name: "learn-article"
  }, {
    path: "/setting/password",
    component: _43a0d02a,
    name: "setting-password"
  }, {
    path: "/setting/person",
    component: _28cc4df1,
    name: "setting-person"
  }, {
    path: "/home/:id?",
    component: _34d43df2,
    name: "home-id"
  }, {
    path: "/post/:id?",
    component: _2757e666,
    name: "post-id"
  }, {
    path: "/",
    component: _6d8228c4,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
