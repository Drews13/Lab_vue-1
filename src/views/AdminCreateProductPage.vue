<template>
  <div class="admin-create-product-page">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :isAlertErrorStyle="error"
    :message="alertMessage"/>
    <h1 class="admin-create-product-page__title">New Product</h1>
    <ProductDetailsComponent @alert="onProductSubmitted"/>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/InputComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import ProductDetailsComponent from '@/components/ProductDetailsComponent.vue';
import TextConstants from '@/constants/TextConstants';
import TimeConstants from '@/constants/TimeConstants';
import { IProduct } from '@/interfaces/IProduct';

@Options({
  components: {
    InputComponent,
    AlertComponent,
    ProductDetailsComponent
  }
})
export default class AdminCreateProductPage extends Vue {
  showAlert = false;
  error = false;
  alertMessage = '';

  get today() {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  async onProductSubmitted(error, message, productData) {
    this.error = error;
    this.alertMessage = message;
    this.showAlert = true;

    if (!error) {
      const product: IProduct = productData;
      await fetch(`${TextConstants.connectionStr}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }); 

      setTimeout(() => {
        this.$router.push({ name: 'adminProductsPage' });
      }, TimeConstants.alertHideTime);
    } else {
      setTimeout(() => {
        this.showAlert = false;
      }, TimeConstants.alertHideTime);
    }
  }
}
</script>

<style lang="scss">
  .admin-create-product-page {
    &__title {
      @include bottomBorder(3px, $color-grey);
    }
  }

  .product-details {
    border-radius: 15px;
    padding: 10px 10px 100px 10px;
    margin-bottom: 20px;
    background: $color-black;

    &__submit {
      padding: 13px;
      margin: 40px 18.5%;
      line-height: 24px;
      color: $color-white;
      background-color: $color-green;
      border: none;
      width: 63%;
    }
  }

  .field {
    color: $color-white;
    width: 100%;
    padding: 0;
    margin-bottom: 30px;
  }
</style>
