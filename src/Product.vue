<template>
  <div>
    <button class="btn btn-primary" @click="goBack">&larr; Back</button>
    <h1>{{product.name}}</h1>
    <hr>
    <ul class="nav nav-pills">
      <router-link class="presentation"
                   :to="{name: 'viewProduct',
                         params: {productId: product.id}}"
                   tag="li"
                   active-class="active">
        <a>Details</a>
      </router-link>
      <router-link class="presentation"
                   :to="{name: 'productReviews',
                         params: {productId: product.id}}"
                   tag="li"
                   active-class="active">
        <a>Reviews</a>
      </router-link>
      <router-link class="presentation"
                   :to="{name: 'viewProduct',
                         params: {productId: product.id},
                         hash: '#related'}"
                   tag="li"
                   active-class="active">
        <a>Related Products (scroll down)</a>
      </router-link>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
  import {products} from './data/products';

  export default {
    props: {
      productId: {required: true},
    },
    data() {
      return {
        products: products,
        product: null,
      };
    },
    created() {
      this.product = this.getProduct(this.productId);
    },
    methods: {
      getProduct(productId) {
        let match = null;
        this.products.forEach((product) => {
          if (product.id === productId) match = product;
        });
        return match;
      },
      goBack() {
        this.$router.go(-1);
      },
    },
    watch: {
      productId(newValue, oldValue) {
        this.product = this.getProduct(newValue);
      },
    },
  };
</script>
