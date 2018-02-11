import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import {routes} from './routes.js';

export const eventBus = new Vue();
export const authService = {isLoggedIn: false};

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {   // Works with 'history' mode
    if(to.hash) return {selector: to.hash};
    if(savedPosition) return savedPosition;
    return {x: 0, y: 0};
  },
});

// Global guard using meta field of 'viewProfile' route
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.isAuthRequired)) {
    if(!authService.isLoggedIn) {
      alert("Global Guard: You must be logged in.");
      return next(false);
    }
  }
  next();
});

// router.afterEach((to, from) => {
//   alert("You just navigated somewhere.");
// });

Vue.filter('currency', function(value) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
