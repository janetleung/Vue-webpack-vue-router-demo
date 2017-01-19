import jquery from "../node_modules/jquery/dist/jquery.min.js";

import Vue from "../node_modules/vue/dist/vue.min.js";

import "./2048.css";

import routes from "./router.js";


import VueRouter from "../node_modules/vue-router/dist/vue-router.js";
Vue.use(VueRouter);

import app from "./components/app.vue";

import about from "./components/about.vue";

import main from "./components/main.vue";


Vue.config.debug = true;

const router = new VueRouter({ routes: routes });

const apptest = new Vue({ router: router }).$mount('#router');
