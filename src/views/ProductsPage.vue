<template>
  <div class="products-page">
    <h2 class="products-page__title">Products</h2>
    <SectionComponent>
      <div
      v-for="product in sortedProducts"
      :key="product.id">
        <ProductCardComponent :product="product"/>
      </div>
    </SectionComponent>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import sourseData from '../../db.json';
import { IProduct } from '@/interfaces/IProduct';
import CardComponent from '@/components/CardComponent.vue';
import SectionComponent from '@/components/SectionComponet.vue';
import ProductCardComponent from '@/components/ProductCardComponent.vue';

@Options({
  components: {
    CardComponent,
    SectionComponent,
    ProductCardComponent
  }
})
export default class ProductsPage extends Vue {
  products: IProduct[] = sourseData.products

  get sortedProducts() {
    return this.products.sort((a, b) => {
      if (a.creationDate < b.creationDate) {
        return 1;
      }
      if (a.creationDate > b.creationDate) {
        return -1;
      }
      return 0;
    });
  }
}
</script>

<style lang="scss">
  .products-page {
    &__title {
      @include bottomBorder(3px, $color-grey)
    }
  }
</style>
