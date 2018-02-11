<template>
  <div>
    <p><strong>ID:</strong> {{product.id}}</p>
    <p>
      <strong>Price:</strong> {{product.price - discount | currency}}
      <span v-if="discount > 0">(save {{discount | currency}})</span>
    </p>
    <p><strong>In stock:</strong> {{product.inStock}}</p>
    <p>{{product.description}}</p>

    <div v-if="relatedProducts != null" id="related" style="margin: 800px 0;">
      <h2>Related Products</h2>
      <ul>
        <li v-for="related in relatedProducts" :key="related.id">
          <router-link :to="{name: 'viewProduct', params: {productId: related.id}}">
            {{related.name}}
          </router-link>
        </li>
      </ul>
    </div>

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
        discount: 0,
      };
    },
    created() {
      // this.$watch('$route.query.discount', (newValue, oldValue) => {
      //   this.discount = this.getDiscount(this.product.price, newValue);
      // });

      this.product = this.getProduct(this.productId);

      if(typeof this.$route.query.discount !== 'undefined') {
        this.discount = this.getDiscount(this.product.price, this.$route.query.discount);
      }
    },
    // Replace the 2 watchers
    beforeRouteUpdate(to, from, next) {
      this.product = this.getProduct(to.params.productId);
      this.discount = this.getDiscount(this.product.price, to.query.discount);
      next();
    },
    methods: {
      getProduct(productId) {
        let match = null;
        this.products.forEach((product) => {
          if (product.id === productId) match = product;
        });
        return match;
      },
      getDiscount(originalPrice, discountPct) {
        if(!discountPct) return 0;
        return originalPrice * discountPct / 100;
      },
    },
    computed: {
      relatedProducts() {
        if (this.product === null) return [];
        let related = [];
        let count = 0;
        this.products.forEach((product) => {
          if (product.id != this.product.id && count < 5) {
            related.push(product);
            count++;
          }
        });
        return related;
      },
    },
    // watch: {
    //   productId(newValue, oldValue) {
    //     this.product = this.getProduct(newValue);
    //     // this.discount = this.getDiscount(this.product.price, this.$route.query.discount);
    //   },
    // },
  };
</script>
