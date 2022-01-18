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
      <div class="table">
        <div class="table__row">
          <div class="table__cell table__cell--title">Description</div>
          <div class="table__cell table__cell--info">{{product.detailedDescription}}</div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--title">Publisher</div>
          <div class="table__cell table__cell--info">{{product.publisher}}</div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--title">Edition</div>
          <div class="table__cell table__cell--info">{{product.edition}}</div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--title">Release date</div>
          <div class="table__cell table__cell--info">{{product.releaseDate}}</div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--title">Announcement Date</div>
          <div class="table__cell table__cell--info">{{product.announcementDate}}</div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--title">Tags</div>
          <div class="table__cell table__cell--info">{{product.tags}}</div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--title">System Requirements</div>
          <div class="table__cell table__cell--info">{{product.systemRequirements}}</div>
        </div>
      </div>
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
    height: 500px;
    width: 500px;
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
    padding: 5px 0;
  }

  .table {
    &__row {
      padding: 10px 20px;
      border: 1px solid $color-grey;
      width: calc(100% - 40px);
    }

    &__cell--title {
      height: 50px;
      font-size: 20px;
    }

    &__cell--info {
      height: 21px;
      font-size: 16px;
    }
  }  
</style>
