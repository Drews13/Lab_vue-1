<template>
  <div class="search-section-component">
    <InputComponent
    type="text"
    :text="searchPlaceholder"
    v-model="search"
    @update="onSearchChanged"/>
    <div class="search-section-component__results"> 
      <SectionComponent>
        <div v-for="product in sortedProducts" :key="product.id">
          <ProductCardComponent :product="product"/>
        </div>
      </SectionComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IProduct } from '@/interfaces/IProduct';
import SectionComponent from '@/components/ui/SectionComponet.vue';
import ProductCardComponent from '@/components/products/ProductCardComponent.vue';
import InputComponent from '@/components/ui/InputComponent.vue';
import debounce from '@/utils/Deboune';
import TextConstants from '@/constants/TextConstants';
import TimeConstants from '@/constants/TimeConstants';

@Options({
  components: {
    InputComponent,
    SectionComponent,
    ProductCardComponent
  },
  watch: {
    search: [
      {
        handler: 'onSearchChanged'
      }
    ]
  }
})
export default class SearchSectionComponent extends Vue {
  debounceFunction!: (...args: any) => void;
  products: IProduct[] = [];
  searchPlaceholder = TextConstants.searchPlaceholder;
  search = '';

  async mounted() {
    this.updateSearchResults('');
  }

  created() {
    this.debounceFunction = debounce(this.updateSearchResults, TimeConstants.searchDebounceTime);
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
 
  onSearchChanged(value: string) {
    this.debounceFunction(value);
  }
  
  async updateSearchResults(value: string) {
    await fetch(`${TextConstants.connectionStr}/products?name_like=${value}`)
      .then((res) => res.json())
      .then((data) => { 
        this.products = data; 
      })
      .catch((err) => console.log(err.message));
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
