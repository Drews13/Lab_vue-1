<template>
  <div class="checkout-page">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :isAlertErrorStyle="error"
    :message="alertMessage"/>
    <h1 class="checkout-page__title">Checkout</h1>
    <div class="order-details">
      <div class="field">
        <h2>Name</h2>
        <InputComponent type="text" @update="onNameChanged"/>
      </div>
      <div class="field">
        <h2>Surname</h2>
        <InputComponent type="text" @update="onSurnameChanged"/>
      </div>
      <div class="field">
        <h2>Delivery Address</h2>
        <InputComponent type="text" @update="onAddressChanged"/>
      </div>
      <div class="field">
        <h2>Phone Number</h2>
        <InputComponent
        type="text"
        text="+375 (__) ___-__-__"
        :mask="'+375 (##) ###-##-##'"
        @update="onPhoneChanged"/>
      </div>
      <div class="field">
        <h2>Delivery Day</h2>
        <InputComponent type="text" text="yyyy-mm-dd" :mask="'####-##-##'" @update="onDateChanged"/>
      </div>
      <button type="button" class="submit" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapMutations, mapState } from 'vuex';
import AlertComponent from '@/components/AlertComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import Validation from '@/utils/Validation';
import TextConstants from '@/constants/TextConstants';
import TimeConstants from '@/constants/TimeConstants';
import { IUser } from '@/interfaces/IUser';
import { IProduct } from '@/interfaces/IProduct';

@Options({
  components: {
    AlertComponent,
    InputComponent
  },
  computed: {
    ...mapState([
      'userData',
      'cartItems'
    ])
  },
  methods: {
    ...mapMutations([
      'clearCart'
    ])
  }
})
export default class CheckoutPage extends Vue {
  userData?: IUser;
  cartItems?: IProduct[];
  clearCart?: () => void;
  showAlert = false;
  alertMessage = '';
  error = false;
  name = '';
  surname = '';
  address = '';
  phone = '';
  date = '';

  get generateCode() {
    let code = '';
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i += 1) {
      code += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return code;
  }

  onNameChanged(value: string) {
    this.name = value;
  }

  onSurnameChanged(value: string) {
    this.surname = value;
  }

  onAddressChanged(value: string) {
    this.address = value;
  }

  onPhoneChanged(value: string) {
    this.phone = value;
  }

  onDateChanged(value: string) {
    this.date = value;
  }

  async submit() {
    if (!this.checkForm()) {
      return false;
    }

    const orderDetails = {
      id: this.generateCode,
      userId: this.userData?.id,
      userName: this.name,
      userSurname: this.surname,
      deliveryAddress: this.address,
      deliveryDay: this.date,
      phoneNumber: this.phone,
      orderedItems: this.cartItems
    }

    await fetch(`${TextConstants.connectionStr}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    });

    if (this.clearCart) {
      this.clearCart();
    }
    this.$router.push({ name: 'homePage' });
    return true;
  }

  checkForm() {
    this.showAlert = true;
    this.alertMessage = TextConstants.successMsg;

    setTimeout(() => {
      this.showAlert = false;
    }, TimeConstants.alertHideTime);

    if (this.name.length === 0) {
      this.error = true;
      this.alertMessage = TextConstants.wrongNameMsg;
      return false;
    }

    if (this.surname.length === 0) {
      this.error = true;
      this.alertMessage = TextConstants.wrongSurnameMsg;
      return false;
    }

    if (this.address.length === 0) {
      this.error = true;
      this.alertMessage = TextConstants.wrongAddressMsg;
      return false;
    }

    if (!Validation.checkDate(this.date)) {
      this.error = true;
      this.alertMessage = TextConstants.wrongDayMsg;
      return false;
    }

    return true;
  }
}

</script>

<style lang="scss">
  .checkout-page {
    &__title {
      @include bottomBorder(3px, $color-grey);
    }
  }

  .order-details {
    border-radius: 15px;
    padding: 10px 10px 100px 10px;
    margin-bottom: 20px;
    background: $color-black;
  }

  .field {
    color: $color-white;
    width: 100%;
    padding: 0;
    margin-bottom: 30px;
  }

  .submit {
    padding: 13px;
    margin: 40px 18.5%;
    line-height: 24px;
    color: $color-white;
    background-color: $color-green;
    border: none;
    width: 63%;
  }
</style>
