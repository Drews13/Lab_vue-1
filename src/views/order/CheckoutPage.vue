<template>
  <div class="checkout-page">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :message="alertMessage"/>
    <h1 class="checkout-page__title">Checkout</h1>
    <div class="order-details">
      <div class="field">
        <h2>Name</h2>
        <InputComponent type="text" v-model="name"/>
      </div>
      <div class="field">
        <h2>Surname</h2>
        <InputComponent type="text" v-model="surname"/>
      </div>
      <div class="field">
        <h2>Delivery Address</h2>
        <InputComponent type="text" v-model="address"/>
      </div>
      <div class="field">
        <h2>Phone Number</h2>
        <InputComponent type="text" :text="phonePlaceholder" :mask="phoneMask" v-model="phone"/>
      </div>
      <div class="field">
        <h2>Delivery Day</h2>
        <InputComponent type="text" :text="datePlaceholder" :mask="dateMask" v-model="date"/>
      </div>
      <button type="button" class="order-details__submit" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters, mapMutations, mapState } from 'vuex';
import AlertComponent from '@/components/alert/AlertComponent.vue';
import InputComponent from '@/components/ui/InputComponent.vue';
import Validation from '@/utils/Validation';
import TextConstants from '@/constants/TextConstants';
import TimeConstants from '@/constants/TimeConstants';
import Constants from '@/constants/Constants';
import { IUser } from '@/interfaces/IUser';
import { ICartItem } from '@/interfaces/ICartItem';

@Options({
  components: {
    AlertComponent,
    InputComponent
  },
  computed: {
    ...mapState([
      'userData',
      'cartItems'
    ]),
    ...mapGetters([
      'totalCost',
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
  cartItems?: ICartItem[];
  totalCost?: number;
  clearCart?: () => void;
  showAlert = false;
  alertMessage = '';
  error = false;
  name = '';
  surname = '';
  address = '';
  phone = '';
  date = '';
  phonePlaceholder = TextConstants.phonePlaceholder;
  datePlaceholder = TextConstants.datePlaceholder;
  phoneMask = TextConstants.phoneMask;
  dateMask = TextConstants.dateMask;

  get generateCode() {
    let code = '';
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < Constants.orderCodeLength; i += 1) {
      code += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return code;
  }

  async submit() {
    if (this.checkForm()) {
      const orderDetails = {
        id: this.generateCode,
        userId: this.userData?.id,
        userName: this.name,
        userSurname: this.surname,
        deliveryAddress: this.address,
        deliveryDay: this.date,
        phoneNumber: this.phone,
        orderedItems: this.cartItems,
        totalCost: this.totalCost
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
      this.$router.push({ name: 'orderThanksPage', params: { id: orderDetails.id } });
    }
  }

  checkForm() {
    if (this.name.length === 0) {
      this.alert(true, TextConstants.wrongNameMsg);
      return false;
    }

    if (this.surname.length === 0) {
      this.alert(true, TextConstants.wrongSurnameMsg);
      return false;
    }

    if (this.address.length === 0) {
      this.alert(true, TextConstants.wrongAddressMsg);
      return false;
    }

    if (!Validation.checkDate(this.date)) {
      this.alert(true, TextConstants.wrongDayMsg);
      return false;
    }

    this.alert(false, TextConstants.successMsg);
    return true;
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
