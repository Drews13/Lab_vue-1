<template>
  <div class="search-section-component">
    <InputComponent type="text" text="Search..." @update="onSearchChanged"/>
    <div class="search-section-component__results"> 
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
import { IProduct } from '@/interfaces/IProduct';
import SectionComponent from '@/components/SectionComponet.vue';
import ProductCardComponent from '@/components/ProductCardComponent.vue';
import debounce from '@/utils/Deboune';

@Options({
  components: {
    InputComponent,
    SectionComponent,
    ProductCardComponent
  }
})
export default class SearchSectionComponent extends Vue {
  debounceFunction!: (...args: any) => void;
  products: IProduct[] = [];
  searchResults: IProduct[] = [];

  async mounted() {
    await fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => { 
        this.products = data;
        this.searchResults = data;
      })
      .catch((err) => console.log(err.message));
  }

  created() {
    this.debounceFunction = debounce(this.updateSearchResults, 300);
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
 
  onSearchChanged(value) {
    this.debounceFunction(value);
  }
  
  updateSearchResults(value) {
    this.searchResults = this.sortedProducts.filter(
      (product) => product.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
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
