<template>
  <div class="admin-products-page">
    <h1 class="admin-products-page__title">Products</h1>
    <router-link :to="{ name: 'adminCreateProductPage' }">
      <button class="admin-products-page__add-product-btn">Add Product</button>
    </router-link>
    <div class="products-list">
      <div class="products-list__item" v-for="product in products" :key="product.id">
        <img class="products-list__item__image"
        :src="`/images/productsImages/${product.image}`"
        @error="defaultImage">
        <h4 class="products-list__item__name">{{product.name}}</h4>
        <router-link :to="{ name: 'adminEditProductPage', params: { id: product.id } }">
          <button class="products-list__item__edit-btn">Edit</button>
        </router-link>
        <button class="products-list__item__remove-btn" @click="deleteProduct(product.id)">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { IProduct } from '@/interfaces/IProduct';
import TextConstants from '@/constants/TextConstants';

export default class AdminProductsPage extends Vue {
  products: IProduct[] = [];

  async mounted() {
    await this.getProducts();
  }

  async getProducts() {
    await fetch(`${TextConstants.connectionStr}/products`)
      .then((res) => res.json())
      .then((data) => { 
        this.products = data; 
      })
      .catch((err) => console.log(err.message));
  }

  async deleteProduct(id: number) {
    await fetch(`${TextConstants.connectionStr}/products/${id}`, {
      method: 'DELETE',
    }); 
    this.getProducts();
  }

  defaultImage(e) {
    e.target.src = '/images/notFound/notFound1.png';
  }
}
</script>

<style lang="scss">
  .admin-products-page {
    &__title {
      @include bottomBorder(3px, $color-grey);
    }

    &__add-product-btn {
      margin-bottom: 20px;
      cursor: pointer;
      padding: 25px;
      line-height: 24px;
      color: $color-white;
      background-color: $color-green;
      border: none;
      width: 100%;
    }
  }

  .products-list {
    margin-bottom: 20px;

    &__item {
      border: 1px solid $color-grey;
      padding: 15px;
      display: grid;
      grid-template-columns: 2fr 8fr 5fr 5fr;
      
      &__image {
        width: 80px;
        height: 80px;
      }

      &__name {
        padding: 0 15px;
      }

      &__edit-btn {
        cursor: pointer;
        padding: 13px;
        line-height: 24px;
        color: $color-white;
        background-color: $color-black-translusent;
        border: none;
        width: 100%;
        height: 100%;
      }

      &__remove-btn {
        cursor: pointer;
        padding: 13px;
        line-height: 24px;
        color: $color-white;
        background-color: $color-orange;
        border: none;
      }
    }
  }
</style>
