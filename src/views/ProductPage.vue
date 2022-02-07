<template>
  <div class="product-page" v-if="products.length">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :isAlertErrorStyle="error"
    :message="alertMessage"/>
    <img class="product-page__image" 
    :src="`/images/productsImages/${product.image}`"
    @error="defaultImage">
    <div class="main-info">
      <h2 class="main-info__name">{{product.name}}</h2>
      <div class="main-info__price">
        {{product.price}}$
      </div>
      <button 
      v-if="findItemById(product.id)"
      class="main-info__add-to-cart-btn"
      @click="removeFromCart">
        Remove from Cart
      </button>
      <button v-else class="main-info__add-to-cart-btn" @click="addToCart">
        Add to cart
      </button>
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
import { Vue, Options } from 'vue-class-component';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { IProduct } from '@/interfaces/IProduct';
import AlertComponent from '@/components/AlertComponent.vue';
import TextConstants from '@/constants/TextConstants';
import TimeConstants from '@/constants/TimeConstants';

@Options({
  components: {
    AlertComponent
  },
  computed: {
    ...mapState([
      'isAuth'
    ]),
    ...mapGetters([
      'findItemById'
    ]),
  },
  methods: {
    ...mapMutations([
      'addCartItem',
      'removeCartItem'
    ])
  }
})
export default class ProductPage extends Vue {
  products: IProduct[] = [];
  findItemById?: (id: number) => boolean;
  addCartItem?: (data: IProduct) => void;
  removeCartItem?: (id: number) => void;
  isAuth?: boolean;
  showAlert = false;
  error = false;
  alertMessage = '';

  async mounted() {
    await fetch(`${TextConstants.connectionStr}/products`)
      .then((res) => res.json())
      .then((data) => { 
        this.products = data; 
      })
      .catch((err) => console.log(err.message));
  } 

  get productId() {
    return parseInt(this.$route.params.id as string, 10);
  }

  get product() {
    return this.products.find((product) => product.id === this.productId);
  }

  addToCart() {
    if (this.isAuth) {
      if (this.addCartItem && this.product) {
        this.addCartItem(this.product);
        this.error = false;
        this.alertMessage = TextConstants.successMsg;
      }
    } else {
      this.error = true;
      this.alertMessage = TextConstants.nonAuthMsg;
    }
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, TimeConstants.alertHideTime);
  }

  removeFromCart() {
    if (this.removeCartItem && this.product) {
      this.removeCartItem(this.product.id);
      this.error = false;
      this.alertMessage = TextConstants.successMsg;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, TimeConstants.alertHideTime);
    }
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
