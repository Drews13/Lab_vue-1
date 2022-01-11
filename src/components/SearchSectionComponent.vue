<template>
  <div class="search-section-component">
    <InputComponent type="text" text="Search..." @update="updateSearchResults"/>
    <div class="search-section-component__results" v-if="searchResults.length"> 
      <SectionComponent>
        <div v-for="product in searchResults"
        :key="product.id">
          <ProductCardComponent :product="product"/>
        </div>
      </SectionComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/InputComponent.vue';
import sourseData from '../../db.json';
import { IProduct } from '@/interfaces/IProduct';
import SectionComponent from '@/components/SectionComponet.vue';
import ProductCardComponent from '@/components/ProductCardComponent.vue';

@Options({
  components: {
    InputComponent,
    SectionComponent,
    ProductCardComponent
  }
})
export default class SearchSectionComponent extends Vue {
  products: IProduct[] = sourseData.products;
  searchResults: IProduct[] = [];

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

  updateSearchResults(value) {
    this.searchResults = this.sortedProducts.filter(
      (product) => product.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )
    if (!value.length) this.searchResults = [];
  }
}
</script>

<style lang="scss">
  .search-section-component {
    border-radius: 15px;
    padding: 10px 10px 100px 10px;
    margin-bottom: 20px;
    background: $color-black;

    &__results {
      margin-top: 100px;
    }
  }
</style>
