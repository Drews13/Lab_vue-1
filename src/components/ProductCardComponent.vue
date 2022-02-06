<template>
  <div class="product-card-component">
    <div class="front">
      <img class="front__image"
      :src="`/images/productsImages/${product.image}`"
      @error="defaultImage">
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
      <button  v-if="isInCart" class="back__button" @click="removeFromCart">
        Remove from cart
      </button>
      <button v-else class="back__button" @click="addToCart">Add to cart</button>
    </div>
  </div>
  <teleport to="#alert">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :isAlertErrorStyle="error"
    :message="alertMessage"/>
  </teleport>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { IProduct } from '@/interfaces/IProduct';
import AlertComponent from '@/components/AlertComponent.vue';
import TextConstants from '@/constants/TextConstants';
import TimeConstants from '@/constants/TimeConstants';

@Options({
  props: {
    product: {
      type: Object as ()=> IProduct,
      required: true
    }
  },
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
export default class ProductCardComponent extends Vue {
  findItemById?: (data: number) => boolean;
  addCartItem?: (data: IProduct) => void;
  removeCartItem?: (data: number) => void;
  isAuth?: boolean;
  product?: IProduct;
  showAlert = false;
  error = false;
  alertMessage = '';

  get isInCart() {
    if (this.findItemById && this.product) {
      return this.findItemById(this.product.id);
    }
    return false;
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
