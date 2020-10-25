import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _df5773fa = () => interopDefault(import('..\\pages\\codeshare\\index.vue' /* webpackChunkName: "pages_codeshare_index" */))
const _470c2352 = () => interopDefault(import('..\\pages\\contribute\\index.vue' /* webpackChunkName: "pages_contribute_index" */))
const _01ac8894 = () => interopDefault(import('..\\pages\\draft\\index.vue' /* webpackChunkName: "pages_draft_index" */))
const _2d89b468 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages_login_index" */))
const _05d0abb7 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages_search_index" */))
const _15821b8a = () => interopDefault(import('..\\pages\\shorthand\\index.vue' /* webpackChunkName: "pages_shorthand_index" */))
const _662ff796 = () => interopDefault(import('..\\pages\\write\\index.vue' /* webpackChunkName: "pages_write_index" */))
const _84789b26 = () => interopDefault(import('..\\pages\\learn\\article\\index.vue' /* webpackChunkName: "pages_learn_article_index" */))
const _5d95e4f4 = () => interopDefault(import('..\\pages\\setting\\blogshow\\index.vue' /* webpackChunkName: "pages_setting_blogshow_index" */))
const _4197870a = () => interopDefault(import('..\\pages\\setting\\password\\index.vue' /* webpackChunkName: "pages_setting_password_index" */))
const _dd590e60 = () => interopDefault(import('..\\pages\\setting\\person\\index.vue' /* webpackChunkName: "pages_setting_person_index" */))
const _cdf11070 = () => interopDefault(import('..\\pages\\home\\_id.vue' /* webpackChunkName: "pages_home__id" */))
const _4a6d05b2 = () => interopDefault(import('..\\pages\\post\\_id.vue' /* webpackChunkName: "pages_post__id" */))
const _0ec40adf = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/codeshare",
    component: _df5773fa,
    name: "codeshare"
  }, {
    path: "/contribute",
    component: _470c2352,
    name: "contribute"
  }, {
    path: "/draft",
    component: _01ac8894,
    name: "draft"
  }, {
    path: "/login",
    component: _2d89b468,
    name: "login"
  }, {
    path: "/search",
    component: _05d0abb7,
    name: "search"
  }, {
    path: "/shorthand",
    component: _15821b8a,
    name: "shorthand"
  }, {
    path: "/write",
    component: _662ff796,
    name: "write"
  }, {
    path: "/learn/article",
    component: _84789b26,
    name: "learn-article"
  }, {
    path: "/setting/blogshow",
    component: _5d95e4f4,
    name: "setting-blogshow"
  }, {
    path: "/setting/password",
    component: _4197870a,
    name: "setting-password"
  }, {
    path: "/setting/person",
    component: _dd590e60,
    name: "setting-person"
  }, {
    path: "/home/:id?",
    component: _cdf11070,
    name: "home-id"
  }, {
    path: "/post/:id?",
    component: _4a6d05b2,
    name: "post-id"
  }, {
    path: "/",
    component: _0ec40adf,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
