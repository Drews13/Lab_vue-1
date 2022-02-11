<template>
  <div class="cart-page">
    <h1 class="cart-page__title">My Basket</h1>
    <div class="basket">
      <div class="basket__head">
        <div class="basket__head__title">Your Order Details</div>
        <div class="basket__head__title">Platform</div>
        <div class="basket__head__title">Amount</div>
        <div class="basket__head__title">Price</div>
      </div>
      <div class="basket__list">
        <div class="basket__list-item" v-for="item in cartItems" :key="item.id">
          <img class="item__image"
          :src="`/images/productsImages/${item.image}`"
          @error="defaultImage">
          <h4 class="item__name">{{item.name}}</h4>
          <select class="item__platforms">
            <option v-for="id in item.categoriesId" :key="id">
              {{getСategoryName(id)}}
            </option>
          </select>
          <div class="item__quantity">
            <button v-if="item.quantity > 1"
            class="quantity-button quantity-button--enabled"
            @click="changeItemQuantity({id: item.id, term: -1})">
              -
            </button>
            <button v-else class="quantity-button quantity-button--disabled">-</button>
            <div class="quantity-label">{{item.quantity}}</div>
            <button 
            class="quantity-button quantity-button--enabled"
            @click="changeItemQuantity({id: item.id, term: 1})">
              +
            </button>
            <div class="item__remove-btn" @click="removeCartItem(item.id)">Remove</div>
          </div>
          <div class="item__price">
            {{item.price}}
          </div>
        </div>
      </div>
    </div>
    <router-link v-if="itemsInCartCount" :to="{ name: 'checkoutPage' }">
      <button class="checkout-btn">Checkout</button>
    </router-link>
    <div v-if="itemsInCartCount" class="total-container">
      <div class="total total--left">Total:</div>
      <div class="total total--right">{{totalCost}}$</div>
    </div>
    <h3 v-else>Your Basket Is Empty</h3>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapMutations, mapGetters } from 'vuex';
import { IProduct } from '@/interfaces/IProduct';
import { ICategory } from '@/interfaces/ICategory';
import TextConstants from '@/constants/TextConstants';

@Options({
  computed: {
    ...mapState([
      'cartItems',
    ]),
    ...mapGetters([
      'itemsInCartCount'
    ])
  },
  methods: {
    ...mapMutations([
      'changeItemQuantity',
      'removeCartItem'
    ])
  }
})
export default class CartPage extends Vue {
  cartItems?: IProduct[];
  categories: ICategory[] = [];
  itemsInCartCount?: number;
  changeItemQuantity?: (data: {id: number, term:number}) => void;
  removeCartItem?: (id: number) => void;

  async mounted() {
    await fetch(`${TextConstants.connectionStr}/categories`)
      .then((res) => res.json())
      .then((data) => { 
        this.categories = data 
      })
      .catch((err) => console.log(err.message));
  }

  get totalCost() {
    const initialValue = 0;
    return this.cartItems?.reduce(
      (previous, current) => previous + current.price * current.quantity,
      initialValue
    ).toFixed(2);
  }

  getСategoryName(id: number) {
    const foundCategory = this.categories.find((category) => category.id === id);
    return foundCategory?.name;
  }

  defaultImage(e) {
    e.target.src = '/images/notFound/notFound1.png';
  }
}
</script>

<style lang="scss">
  .cart-page {
    &__title {
      @include bottomBorder(3px, $color-grey);
    }
  }

  .basket {
    &__head {
      display: grid;
      grid-template-columns: 10fr 6fr 3fr 1fr;
      padding: 15px;
      background-color: $color-basket-head;
      border: 1px solid $color-grey;
      border-bottom: 0;

      &__title {
        padding: 0 20px;
      }
    }

    &__list-item {
      border: 1px solid $color-grey;
      padding: 15px;
      display: grid;
      grid-template-columns: 2fr 8fr 6fr 3fr 1fr;
    }
  }

  .item {
    &__image {
      width: 80px;
      height: 80px;
    }

    &__name {
      padding: 0 15px;
    }

    &__platforms {
      height: 58px;
      margin: 8px 20px;
      background: $color-transparent;
      border: 1px solid $color-authorization-border;
      border-left: none;
      border-right: none;
      font-weight: bold;
    }

    &__quantity {
      padding-top: 15px;
      font-size: 15px;
    }

    &__remove-btn {
      margin-left: 25px;
      text-decoration: underline;
      cursor: pointer;
    }

    &__price {
      padding: 25px 20px 0 20px;
    }
  }

  .quantity-button {
    display: inline-block;
    width: 36px;
    height: 36px;
    border: 1px solid $color-button-border;

    &--enabled {
      cursor: pointer;
      background: $color-white;

      &:hover {
        background: $color-black;
        color: $color-white;
      }
    }

    &--disabled {
      color: $color-transparent;
      background: $color-basket-button-disabled;
    }
  }

  .quantity-label {
    text-align: center;
    display: inline-block;
    width: 36px;
    height: 36px;
  }

  .total-container {
    margin-top: 20px;
    margin-left: 7%;
    display: inline-block;
    width: 50%;
  }

  .total {
    font-weight: 700;
    font-size: 18px;

    &--left {
      float: left;
    }

    &--right {
      float: right;
    }
  }

  .checkout-btn {
    cursor: pointer;
    padding: 13px;
    margin-top: 20px;
    line-height: 24px;
    color: $color-white;
    background-color: $color-green;
    border: none;
    width: 43%;
  }
</style>
