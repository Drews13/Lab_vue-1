<template>
  <div class="order-thanks-page">
    <div v-if="isUserValid">
      <h1 class="order-thanks-page__title">Thanks For The Order</h1>
      <div class="basket">
        <div class="basket__head">
          <div class="basket__head__title">Your Order Details</div>
          <div class="basket__head__title">Platform</div>
          <div class="basket__head__title">Amount</div>
          <div class="basket__head__title">Price</div>
        </div>
        <div class="basket__list">
          <div class="basket__list-item" v-for="item in orderInfo.orderedItems" :key="item.id">
            <img class="item__image"
            :src="`/images/productsImages/${item.image}`"
            @error="defaultImage">
            <h4 class="item__name">{{item.name}}</h4>
            <div class="item__platform">{{getCategoryName(item.categoryId)}}</div>
            <div class="item__amount">{{item.quantity}}</div>
            <div class="item__price">{{item.price}}</div>
          </div>
        </div>
      </div>
      <div class="order-code">
        Order Code: {{orderInfo.id}}
      </div>
      <div class="total-container">
        <div class="total total--left">Total:</div>
        <div class="total total--right">{{orderInfo.totalCost}}$</div>
      </div>
    </div>
    <div v-else>
      <h1 class="order-not-found">Order not found</h1>
    </div>
    <div class="back-link-container">
      <router-link class="back-link" :to="{ name: 'homePage' }">
        &lt;Back to Home Page
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState } from 'vuex';
import { ICategory } from '@/interfaces/ICategory';
import { IUser } from '@/interfaces/IUser';
import { IOrder } from '@/interfaces/IOrder';
import TextConstants from '@/constants/TextConstants';

@Options({
  computed: {
    ...mapState([
      'isAuth',
      'userData'
    ])
  }
})
export default class OrderThanksPage extends Vue {
  isAuth?: boolean;
  userData?: IUser;
  orderInfo: IOrder|null = null;
  categories: ICategory[] = [];

  async mounted() {
    await fetch(`${TextConstants.connectionStr}/categories`)
      .then((res) => res.json())
      .then((data) => { 
        this.categories = data;
      })
      .catch((err) => console.log(err.message));
    await fetch(`${TextConstants.connectionStr}/orders/${this.$route.params.id}`)
      .then((res) => res.json())
      .then((data) => { 
        this.orderInfo = data;
      })
      .catch((err) => console.log(err.message));
    console.log(this.orderInfo);
  }

  get isUserValid() {
    if (this.isAuth !== undefined) {
      if (this.isAuth && this.userData?.id === this.orderInfo?.userId) {
        return true;
      }
      return false;
    }
    return false;
  }

  getCategoryName(id: number) {
    const foundCategory = this.categories.find((category) => category.id === id);
    return foundCategory?.name;
  }

  defaultImage(e) {
    e.target.src = '/images/notFound/notFound1.png';
  }
}
</script>

<style lang="scss">
  .order-thanks-page {
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
      padding-left: 20px;
    }

    &__platform {
      padding-left: 20px;
    }

    &__amount {
      padding-left: 15px;
    }

    &__price {
      padding-left: 15px;
    }
  }

  .order-code {
    margin-top: 20px;
    font-weight: 700;
    font-size: 18px;
    display: inline-block;
  }

  .total-container {
    margin-left: 40%;
    width: 49%;
    margin-top: 20px;
    display: inline-block;
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

  .back-link-container {
    margin-top: 30px;
    text-align: center;
  }

  .back-link {
    text-decoration: none;
    font-weight: 600;
    font-size: 20px;
    color: $color-green;

    &:hover {
      text-decoration: underline;
      text-decoration-color: $color-orange;
    }
  }

  .order-not-found {
    text-align: center;
  }
</style>
