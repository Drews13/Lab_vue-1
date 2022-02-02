<template>
  <div class="products-page">
    <h2 class="products-page__title">Products</h2>
    <SectionComponent>
      <select class="filters-item" v-model="sortOption" @change="onOptionChanged">
        <option value="">Latest</option>
        <optgroup label="Price">
          <option value="PriceAsc">Low to high</option>
          <option value="PriceDesc">High to low</option>
        </optgroup>
        <optgroup label="Rating">
          <option value="RatingAsc">Low to high</option>
          <option value="RatingDesc">High to low</option>
        </optgroup>
      </select>
      <select class="filters-item" v-model="genreOption" @change="onOptionChanged">
        <option value="">All Genres</option>
        <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
      </select>
      <select class="filters-item" v-model="ratingOption" @change="onOptionChanged">
        <option value="">All Ratings</option>
        <option v-for="n in 5" :key=n :value="n">{{n}}</option>
      </select>
      <select class="filters-item" v-model="publisherOption" @change="onOptionChanged">
        <option value="">All Publishers</option>
        <option v-for="publisher in publishers" :key="publisher" :value="publisher">
          {{ publisher }}
        </option>
      </select>
    </SectionComponent>
    <SectionComponent>
      <div
      v-for="product in filteredProducts"
      :key="product.id">
        <ProductCardComponent :product="product"/>
      </div>
    </SectionComponent>
  </div>
  <teleport to="#loader">
    <LoaderComponent v-if="showLoader"/>
  </teleport>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IProduct } from '@/interfaces/IProduct';
import CardComponent from '@/components/CardComponent.vue';
import SectionComponent from '@/components/SectionComponet.vue';
import ProductCardComponent from '@/components/ProductCardComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import TextConstants from '@/constants/TextConstants';

// eslint-disable-next-line no-shadow
enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}

@Options({
  components: {
    CardComponent,
    SectionComponent,
    ProductCardComponent,
    LoaderComponent
  }
})
export default class ProductsPage extends Vue {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  sortOption = '';
  genreOption = '';
  ratingOption = '';
  publisherOption = '';
  showLoader = false;
  genres = [
    'Action/RPG',
    'Fantasy',
    'Shooter',
    'Sports Simulator',
    'Survival Horror'
  ];
  publishers = [
    'Bethesda Softworks',
    'Blizzard Entertainment',
    'CD Projekt',
    'Electronic Arts',
    'Techland'
  ]

  async mounted() {
    await fetch(`${TextConstants.connectionStr}/products`)
      .then((res) => res.json())
      .then((data) => { 
        this.products = data; 
      })
      .catch((err) => console.log(err.message));
    this.filteredProducts = this.sortedProducts;
  }

  get sortedProducts() {
    switch (this.sortOption) {
      case 'PriceAsc': 
        return this.products.sort(this.customSort<IProduct>('price', SortType.ASC));
      case 'PriceDesc': 
        return this.products.sort(this.customSort<IProduct>('price', SortType.DESC));
      case 'RatingAsc': 
        return this.products.sort(this.customSort<IProduct>('rating', SortType.ASC));
      case 'RatingDesc': 
        return this.products.sort(this.customSort<IProduct>('rating', SortType.DESC));
      default:
        return this.products.sort(this.customSort<IProduct>('creationDate', SortType.DESC));
    }
  }

  customSort<T>(field: string, type: SortType): (a: T, b: T) => number {
    return (a: T, b: T): number => {
      if (a[field] > b[field]) return type === SortType.ASC ? 1 : -1;
      if (a[field] < b[field]) return type === SortType.ASC ? -1 : 1;
      return 0;
    }
  }

  onOptionChanged() {
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
      this.filteredProducts = this.sortedProducts.filter(
        (product) => (product.genre === this.genreOption || this.genreOption === '')
          && (product.rating === Number(this.ratingOption) || this.ratingOption === '')
          && (product.publisher === this.publisherOption || this.publisherOption === '')
      );
    }, 1000);
  }
}
</script>

<style lang="scss">
  .products-page {
    &__title {
      @include bottomBorder(3px, $color-grey)
    }
  }
  
  .filters-item {
    height: 58px;
    margin: 8px 20px;
    background: $color-transparent;
    border: 1px solid $color-authorization-border;
    border-left: none;
    border-right: none;
    font-weight: bold;
  }
</style>
