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
        <option value="Action/RPG">Action/RPG</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Shooter">Shooter</option>
        <option value="Sports Simulator">Sports Simulator</option>
        <option value="Survival Horror">Survival Horror</option>
      </select>
      <select class="filters-item" v-model="ratingOption" @change="onOptionChanged">
        <option value="">All Ratings</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <select class="filters-item" v-model="publisherOption" @change="onOptionChanged">
        <option value="">All Publishers</option>
        <option value="Bethesda Softworks">Bethesda Softworks</option>
        <option value="Blizzard Entertainment">Blizzard Entertainment</option>
        <option value="CD Projekt">CD Projekt</option>
        <option value="Electronic Arts">Electronic Arts</option>
        <option value="Techland">Techland</option>
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
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
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
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  sortOption = '';
  genreOption = '';
  ratingOption = '';
  publisherOption = '';

  async mounted() {
    await fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => { this.products = data; })
      .catch((err) => console.log(err.message));
    this.filteredProducts = this.sortedProducts;
  }

  get sortedProducts() {
    switch (this.sortOption) {
      case 'PriceAsc': 
        return this.products.sort(this.sortByPriceAsc);
      case 'PriceDesc': 
        return this.products.sort(this.sortByPriceDesc);
      case 'RatingAsc': 
        return this.products.sort(this.sortByRatingAsc);
      case 'RatingDesc': 
        return this.products.sort(this.sortByRatingDesc);
      default:
        return this.products.sort(this.sortByDate);
    }
  }

  sortByDate(a, b) {
    if (a.creationDate < b.creationDate) {
      return 1;
    }
    if (a.creationDate > b.creationDate) {
      return -1;
    }
    return 0;
  }

  sortByPriceAsc(a, b) {
    if (a.price > b.price) {
      return 1;
    }
    if (a.price < b.price) {
      return -1;
    }
    return 0;
  }

  sortByPriceDesc(a, b) {
    if (a.price < b.price) {
      return 1;
    }
    if (a.price > b.price) {
      return -1;
    }
    return 0;
  }

  sortByRatingAsc(a, b) {
    if (a.rating > b.rating) {
      return 1;
    }
    if (a.rating < b.rating) {
      return -1;
    }
    return 0;
  }

  sortByRatingDesc(a, b) {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  }

  onOptionChanged() {
    this.filteredProducts = this.sortedProducts.filter(
      (product) => (product.genre === this.genreOption || this.genreOption === '')
        && (product.rating === Number(this.ratingOption) || this.ratingOption === '')
        && (product.publisher === this.publisherOption || this.publisherOption === '')
    );
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
