<template>
  <div class="home-page">
    <h1 class="home-page__title">Home</h1>
    <SearchSectionComponent/>
    <SectionComponent title="Categories">
      <div
      v-for="category in categories"
      :key="category.id">
        <CardComponent :category="category"/>
      </div>
    </SectionComponent>
    <SectionComponent title="Recently added">
      <div
      v-for="product in sortedProducts.slice(0, 3)"
      :key="product.id">
        <ProductCardComponent :product="product"/>
      </div>
    </SectionComponent>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ICategory } from '@/interfaces/ICategory';
import { IProduct } from '@/interfaces/IProduct';
import CardComponent from '@/components/CardComponent.vue';
import ProductCardComponent from '@/components/ProductCardComponent.vue';
import SectionComponent from '@/components/SectionComponet.vue';
import SearchSectionComponent from '@/components/SearchSectionComponent.vue';
import TextConstants from '@/constants/TextConstants';

@Options({
  components: {
    SectionComponent,
    CardComponent,
    ProductCardComponent,
    SearchSectionComponent
  }
})
export default class HomePage extends Vue {
  categories: ICategory[] = [];
  products: IProduct[] = [];

  async mounted() {
    await fetch(`${TextConstants.connectionStr}/products`)
      .then((res) => res.json())
      .then((data) => { 
        this.products = data 
      })
      .catch((err) => console.log(err.message));

    await fetch(`${TextConstants.connectionStr}/categories`)
      .then((res) => res.json())
      .then((data) => { 
        this.categories = data 
      })
      .catch((err) => console.log(err.message));
  }

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
  .home-page {
    &__title {
      @include bottomBorder(3px, $color-grey)
    }
  }
</style>
