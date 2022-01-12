<template>
  <div class="product-page">
    <img class="product-page__image" 
    :src="`/images/productsImages/${product.image}`" 
    @error="defaultImage">
    <div class="main-info">
      <h2 class="main-info__name">{{product.name}}</h2>
      <div class="main-info__price">
        {{product.price}}$
      </div>
      <button class="main-info__add-to-cart-btn">Add to Cart</button>
    </div>
    <div class="details">
      <table class="table">
        <div class="table__tr">
          <tr class="table__tr__title">Description</tr>
          <tr class="table__tr__info">{{product.detailedDescription}}</tr>
        </div>
        <div class="table__tr">
          <tr class="table__tr__title">Publisher</tr>
          <tr class="table__tr__info">{{product.publisher}}</tr>
        </div>
        <div class="table__tr">
          <tr class="table__tr__title">Edition</tr>
          <tr class="table__tr__info">{{product.edition}}</tr>
        </div>
        <div class="table__tr">
          <tr class="table__tr__title">Release date</tr>
          <tr class="table__tr__info">{{product.releaseDate}}</tr>
        </div>
        <div class="table__tr">
          <tr class="table__tr__title">Announcement Date</tr>
          <tr class="table__tr__info">{{product.announcementDate}}</tr>
        </div>
        <div class="table__tr">
          <tr class="table__tr__title">Tags</tr>
          <tr class="table__tr__info">{{product.tags}}</tr>
        </div>
        <div class="table__tr">
          <tr class="table__tr__title">System Requirements</tr>
          <tr class="table__tr__info">{{product.systemRequirements}}</tr>
        </div>
      </table>
    </div>
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

  defaultImage(e) {
    e.target.src = '/images/notFound/notFound1.png';
  }
}
</script>

<style lang="scss">
  .product-page {
    padding: 60px 150px 20px;

    &__image {
    border: 5px solid $color-grey;
    border-radius: 10px;
  }
  }

  .main-info {
    float: right;
    width: 50%;

    &__name {
      margin: 0;
    }

    &__price {
      padding-top: 5px;
      padding-bottom: 20px;
      color: $color-orange;
      font-size: 21px;
      display: grid;
      @include bottomBorder(1px, $color-grey);
    }

    &__add-to-cart-btn {
      margin-top: 30px;
      padding: 13px 15px;
      line-height: 24px;
      color: $color-white;
      background-color: $color-green;
      border: none;
      width: 100%;
    }

  }

  .details {
    padding-top: 5px;
  }

  .table {

    &__tr{
      padding: 10px 20px;
      border: 1px solid $color-grey;
      width: calc(100% - 40px);
      float: left;

      &__title {
        height: 50px;
        font-size: 20px;
      }

      &__info {
        height: 21px;
        font-size: 16px;
      }
    }
  }
</style>
