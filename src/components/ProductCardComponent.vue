<template>
  <div class="product-card-component">
    <div class="front">
      <img class="front__image"
      :src="`/images/productsImages/${product.image}`">
      <h3>{{product.name}}</h3>
      <h4>Rating: {{product.rating}}/5</h4>
      <h4>Genre: {{product.genre}}</h4>
      <h3 class="front__price">{{product.price}}$</h3>
    </div>    
    <div class="back">
      <router-link
      class="back__router-link"
      :to="{name: 'productPage', params:{id: product.id}}">
        <h3 class="back__description">{{product.shortDescription}}</h3>
      </router-link>
      <button class="back__button">Add to cart</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IProduct } from '@/interfaces/IProduct';

@Options({
  props: {
    product: {
      type: Object as ()=> IProduct,
      required: true
    }
  }
})
export default class ProductCardComponent extends Vue {
  
}
</script>

<style lang="scss">
  .product-card-component {
    margin: 0px 10px 20px 10px;
    position: relative;
    perspective: 1000px;
    width: 1fr;
    height: 650px;

    &:hover {
      .front {
        transform: rotateY(180deg);
      }
      
      .back {
        transform: rotateY(360deg);
      }
    }
  }

  .front, .back {
    width: 100%;
    height: 650px;
    background: $color-black;
    border: 5px solid $color-white;
    border-bottom: 10px solid $color-white;
    border-radius: 20px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .front {
    color: $color-white;
    backface-visibility: hidden;
    transition: 1s;

    &__image {  
      border-radius:14px 10px 0 0;
      width: 100%;
      height: 450px;
    }

    &__price {
      margin-right: 5px;
      float: right;
    }
  }

  .back {
    border-color: $color-orange;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    transition: 1s;
    display: grid;
    grid-template-rows: 10fr 1fr;

    &__router-link {
      text-decoration: none;
      display: inline-block;
      color: $color-orange;
      position: relative;
    }

    &__description {
      position: absolute;
      top: 50%;
      margin: 0 30px;
    }

    &__button {
      border-radius: 10px;
      width: 50%;
      margin: auto;
      padding: 9px 10px;
      height: 40px;
      background: $color-white;
      &:hover {
        background: $color-orange;
      }
    }
  }
</style>
