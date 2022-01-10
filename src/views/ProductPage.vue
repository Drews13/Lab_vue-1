<template>
  <div class="product-page">
    <h2>{{product.name}}</h2>
    <h3 class="product-page__description">{{product.detailedDescription}}</h3>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import sourseData from '../../db.json';

export default class ProductPage extends Vue {
  get productId() {
    return parseInt(this.$route.params.id as string, 10)
  }

  get product() {
    return sourseData.products.find((product) => product.id === this.productId)
  }
}
</script>

<style lang="scss">
  .product-page {
    &__description {
      @include bottomBorder(3px, $color-grey)
    }
  }
</style>
