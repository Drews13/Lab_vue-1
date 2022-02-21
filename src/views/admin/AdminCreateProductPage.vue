<template>
  <div class="admin-create-product-page">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :message="alertMessage"/>
    <h1 class="admin-create-product-page__title">New Product</h1>
    <ProductDetailsComponent @alert="onProductSubmitted"/>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/ui/InputComponent.vue';
import AlertComponent from '@/components/alert/AlertComponent.vue';
import ProductDetailsComponent from '@/components/products/ProductDetailsComponent.vue';
import TextConstants from '@/constants/TextConstants';
import TimeConstants from '@/constants/TimeConstants';

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
    this.alert(error, message);

    if (!error) {
      await fetch(`${TextConstants.connectionStr}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      }); 

      setTimeout(() => {
        this.$router.push({ name: 'adminProductsPage' });
      }, TimeConstants.alertHideTime);
    } 
  }

  alert(err: boolean, msg: string) {
    this.error = err;
    this.alertMessage = msg;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false
    }, TimeConstants.alertHideTime);
  }
}
</script>

<style lang="scss">
  .admin-create-product-page {
    &__title {
      @include bottomBorder(3px, $color-grey);
    }
  }
</style>
