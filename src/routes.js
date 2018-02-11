import ProductList from './ProductList.vue';
import Cart from './Cart.vue';

import Product from './Product.vue';
import Intro from './Intro.vue';
import ViewProduct from './ViewProduct.vue';
import ProductReviews from './ProductReviews.vue';

import SpecialOffer from './SpecialOffer.vue';

import ViewProfile from './ViewProfile.vue';
import {authService} from './main.js';

export const routes = [
  {
    path: '/profile',
    name: 'viewProfile',
    component: ViewProfile,
    meta: {isAuthRequired: true},
    // beforeEnter(to, from, next) {
    //   if(!authService.isLoggedIn) {
    //     alert("Route Guard: You must be logged in.");
    //     return next(false);
    //   }
    //   next();
    // },
  },
  {
    path: '',
    components: {
      special: SpecialOffer,
      default: ProductList,
    },
  },
  {
    path: '/cart',
    component: Cart,
    alias: '/shopping-cart',
  },
  {
    path: '/products/:productId',
    props: true,
    // name: 'product',
    component: Product,
    children: [
      {
        path: '',   // default child
        name: 'product',
        component: Intro,
      },
      {
        path: 'details',
        props: true,
        name: 'viewProduct',
        component: ViewProduct,
      },
      {
        path: 'reviews',
        props: true,
        name: 'productReviews',
        component: ProductReviews,
      },
    ],
  },
  {
    path: '*',
    component: {template: '<h1>Page not found.</h1>'},
  },
];
