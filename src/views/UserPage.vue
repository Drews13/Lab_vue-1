<template>
  <div class="user-page">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :isAlertErrorStyle="error"
    :message="alertMessage"/>
    <h1>My Account</h1>
    <div class="user-page__content">
      <div class="field">
        <h2>Login</h2>
        <InputComponent type="text" :text="this.login" @update="onLoginChanged"/>
      </div>
      <div class="field">
        <h2>E-Mail</h2>
        <InputComponent type="text" :text="this.email" @update="onEmailChanged"/>
      </div>
      <div class="field">
        <h2>First Name</h2>
        <InputComponent type="text" :text="this.firstName" @update="onFirstNameChanged"/>
      </div>
      <div class="field">
        <h2>Last Name</h2>
        <InputComponent type="text" :text="this.lastName" @update="onLastNameChanged"/>
      </div>
      <div class="field">
        <h2>Sex</h2>
        <InputComponent type="text" :text="this.sex" @update="onSexChanged"/>
      </div>
      <div class="field">
        <h2>Age</h2>
        <InputComponent type="text" :text="this.age" @update="onAgeChanged"/>
      </div>
      <div class="field">
        <h2>Address</h2>
        <InputComponent type="text" :text="this.address" @update="onAddressChanged"/>
      </div>
      <div class="field">
        <h2>Shipping Address</h2>
        <InputComponent
        type="text"
        :text="this.shippingAddress"
        @update="onShippingAddressChanged"/>
      </div>
      <div v-if="this.paymentCard"> 
        <div class="field">
          <h2>Payment Card</h2>
          <InputComponent type="text" :text="this.paymentCard.number" @update="onNumberChanged"/>
        </div>
        <div class="field">
          <InputComponent type="text" :text="this.paymentCard.expires" @update="onExpiresChanged"/>
        </div>
        <div class="field">
          <InputComponent type="text" :text="this.paymentCard.cvv" @update="onCvvChanged"/>
        </div>
      </div>
      <button v-else type="button" class="payment-card-btn" @click="showAddCard">
        Add Payment Card
      </button>
      <button type="button" class="password-btn" @click="showChangePassword">
        ChangePassword
      </button>
      <button type="button" class="submit" @click="submit">Submit</button>
    </div>
  </div>
  <teleport to="#modals">
    <ModalComponent v-model:show="changePasswordVisible">
      <ChangePasswordComponent @updateVisibility="hideChangePassword" @alert="onPasswordSubmitted"/>
    </ModalComponent>
    <ModalComponent v-model:show="addCardVisible">
      <AddCardComponent @updateVisibility="hideAddCard" @alert="onCardSubmitted"/>
    </ModalComponent>
  </teleport>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/InputComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import AddCardComponent from '@/components/AddCardComponent.vue';
import ChangePasswordComponent from '@/components/ChangePasswordComponent.vue';
import { IPaymentCard } from '@/interfaces/IPaymentCard';
import { IUser } from '@/interfaces/IUser';
import checkLogin from '@/utils/LoginValidation';
import checkEmail from '@/utils/EmailValidation';
import checkNumber from '@/utils/CardNumberValidation';
import checkExpires from '@/utils/CardExpiresValidation';
import checkCvv from '@/utils/CardCvvValidation';

@Options({
  components: {
    InputComponent,
    AlertComponent,
    ModalComponent,
    AddCardComponent,
    ChangePasswordComponent
  }
})
export default class UserPage extends Vue {
  login: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  sex: string | undefined;
  age: string | undefined;
  address: string | undefined;
  shippingAddress: string | undefined;
  paymentCard: IPaymentCard | null | undefined;
  users: IUser[] = [];
  showAlert = false;
  alertMessage = '';
  error = false;
  changePasswordVisible = false;
  addCardVisible = false;

  created() {
    this.initialize();
  }

  async mounted() {
    await fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => { this.users = data })
      .catch((err) => console.log(err.message));
  }

  initialize() {
    this.login = this.$store.state.userData?.login;
    this.firstName = this.$store.state.userData?.firstName;
    this.lastName = this.$store.state.userData?.lastName;
    this.email = this.$store.state.userData?.email;
    this.password = this.$store.state.userData?.password;
    this.sex = this.$store.state.userData?.sex;
    this.age = this.$store.state.userData?.age;
    this.address = this.$store.state.userData?.address;
    this.shippingAddress = this.$store.state.userData?.shippingAddress;
    this.paymentCard = this.$store.state.userData?.paymentCard;
  }

  onLoginChanged(value) {
    this.login = value;
  }

  onEmailChanged(value) {
    this.email = value;
  }

  onFirstNameChanged(value) {
    this.firstName = value;
  }

  onLastNameChanged(value) {
    this.lastName = value;
  }

  onSexChanged(value) {
    this.sex = value;
  }

  onAgeChanged(value) {
    this.age = value;
  }

  onAddressChanged(value) {
    this.address = value;
  }

  onShippingAddressChanged(value) {
    this.shippingAddress = value;
  }

  onNumberChanged(value) {
    if (this.paymentCard) {
      this.paymentCard.number = value;
    }
  }

  onExpiresChanged(value) {
    if (this.paymentCard) {
      this.paymentCard.expires = value;
    }
  }

  onCvvChanged(value) {
    if (this.paymentCard) {
      this.paymentCard.cvv = value;
    }
  }

  showAddCard() {
    this.addCardVisible = true;
  }

  hideAddCard() {
    this.addCardVisible = false;
  }

  onCardSubmitted(value, message, obj) {
    this.error = value;
    this.alertMessage = message;
    this.paymentCard = obj;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  showChangePassword() {
    this.changePasswordVisible = true;
  }

  hideChangePassword() {
    this.changePasswordVisible = false;
  }

  onPasswordSubmitted(value, message, str) {
    this.error = value;
    this.alertMessage = message;
    this.password = str;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  async submit() {
    if (!this.checkForm()) {
      return false;
    }

    const userData = {
      login: this.login,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email, 
      password: this.password,
      sex: this.sex,
      age: this.age,
      address: this.address,
      shippingAddress: this.shippingAddress,
      paymentCard: this.paymentCard,
      id: this.$store.state.userData?.id
    }

    await fetch(`http://localhost:3000/users/${this.$store.state.userData?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    this.$store.commit('storeUserData', userData);
    return true;
  }

  checkForm() {
    this.showAlert = true;
    this.alertMessage = 'Success!';

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);

    if (!checkLogin(this.login)) {
      this.error = true;
      this.alertMessage = 'Wrong Login!';
      return false;
    }

    if (!checkEmail(this.email)) {
      this.error = true;
      this.alertMessage = 'Wrong E-Mail!';
      return false;
    }

    if (this.email !== this.$store.state.userData?.email && this.checkCoincidence()) {
      this.error = true;
      this.alertMessage = 'Such user already exists!';
      return false;
    }
    
    if (!this.checkAge()) {
      this.error = true;
      this.alertMessage = 'Wrong Age!';
      return false;
    }

    if (this.paymentCard) {
      if (!checkNumber(this.paymentCard.number)) {
        this.error = true;
        this.alertMessage = 'Wrong Number!';
        return false;
      }

      if (!checkExpires(this.paymentCard.expires)) {
        this.error = true;
        this.alertMessage = 'Wrong Expires!';
        return false;
      }

      if (!checkCvv(this.paymentCard.cvv)) {
        this.error = true;
        this.alertMessage = 'Wrong CVV!';
        return false;
      }
    }
    this.error = false;
    return true;
  }

  checkCoincidence() {
    if (this.users.find((user) => user.email === this.email)) {
      return true;
    } 
    return false;
  }

  checkAge() {
    const regExp = /^[1-9]?\d$/;
    return this.age?.search(regExp) !== -1;
  }
}
</script>

<style lang="scss">
  .user-page {
    &__content {
      border-radius: 15px;
      padding: 10px 10px 100px 10px;
      margin-bottom: 20px;
      background: $color-black;
    }
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

  .payment-card-btn {
    padding: 13px;
    margin-bottom: 30px;
    line-height: 24px;
    color: $color-black;
    background-color: $color-orange;
    border: none;
    width: 100%;
  }

  .password-btn {
    padding: 13px;
    margin-bottom: 30px;
    line-height: 24px;
    background-color: $color-white;
    border: none;
    width: 100%;
  }
</style>
