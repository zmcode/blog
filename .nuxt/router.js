import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6516d222 = () => interopDefault(import('..\\pages\\codeshare\\index.vue' /* webpackChunkName: "pages_codeshare_index" */))
const _a4142034 = () => interopDefault(import('..\\pages\\contribute\\index.vue' /* webpackChunkName: "pages_contribute_index" */))
const _49122f80 = () => interopDefault(import('..\\pages\\draft\\index.vue' /* webpackChunkName: "pages_draft_index" */))
const _30a0ccb8 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages_login_index" */))
const _a9c03b6a = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages_search_index" */))
const _52a26c76 = () => interopDefault(import('..\\pages\\shorthand\\index.vue' /* webpackChunkName: "pages_shorthand_index" */))
const _a4d4c2fc = () => interopDefault(import('..\\pages\\write\\index.vue' /* webpackChunkName: "pages_write_index" */))
const _69e5d5fe = () => interopDefault(import('..\\pages\\learn\\article\\index.vue' /* webpackChunkName: "pages_learn_article_index" */))
const _001bb272 = () => interopDefault(import('..\\pages\\setting\\blogshow\\index.vue' /* webpackChunkName: "pages_setting_blogshow_index" */))
const _707e2bf6 = () => interopDefault(import('..\\pages\\setting\\password\\index.vue' /* webpackChunkName: "pages_setting_password_index" */))
const _2d3668bc = () => interopDefault(import('..\\pages\\setting\\person\\index.vue' /* webpackChunkName: "pages_setting_person_index" */))
const _e7fdcf48 = () => interopDefault(import('..\\pages\\home\\_id.vue' /* webpackChunkName: "pages_home__id" */))
const _6479c48a = () => interopDefault(import('..\\pages\\post\\_id.vue' /* webpackChunkName: "pages_post__id" */))
const _6da5d51a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/codeshare",
    component: _6516d222,
    name: "codeshare"
  }, {
    path: "/contribute",
    component: _a4142034,
    name: "contribute"
  }, {
    path: "/draft",
    component: _49122f80,
    name: "draft"
  }, {
    path: "/login",
    component: _30a0ccb8,
    name: "login"
  }, {
    path: "/search",
    component: _a9c03b6a,
    name: "search"
  }, {
    path: "/shorthand",
    component: _52a26c76,
    name: "shorthand"
  }, {
    path: "/write",
    component: _a4d4c2fc,
    name: "write"
  }, {
    path: "/learn/article",
    component: _69e5d5fe,
    name: "learn-article"
  }, {
    path: "/setting/blogshow",
    component: _001bb272,
    name: "setting-blogshow"
  }, {
    path: "/setting/password",
    component: _707e2bf6,
    name: "setting-password"
  }, {
    path: "/setting/person",
    component: _2d3668bc,
    name: "setting-person"
  }, {
    path: "/home/:id?",
    component: _e7fdcf48,
    name: "home-id"
  }, {
    path: "/post/:id?",
    component: _6479c48a,
    name: "post-id"
  }, {
    path: "/",
    component: _6da5d51a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
