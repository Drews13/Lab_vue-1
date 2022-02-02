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
        <InputComponent type="text" :text="login" @update="onLoginChanged"/>
      </div>
      <div class="field">
        <h2>E-Mail</h2>
        <InputComponent type="text" :text="email" @update="onEmailChanged"/>
      </div>
      <div class="field">
        <h2>First Name</h2>
        <InputComponent type="text" :text="firstName" @update="onFirstNameChanged"/>
      </div>
      <div class="field">
        <h2>Last Name</h2>
        <InputComponent type="text" :text="lastName" @update="onLastNameChanged"/>
      </div>
      <div class="field">
        <h2>Sex</h2>
        <InputComponent type="text" :text="sex" @update="onSexChanged"/>
      </div>
      <div class="field">
        <h2>Age</h2>
        <InputComponent type="text" :text="age" @update="onAgeChanged"/>
      </div>
      <div class="field">
        <h2>Address</h2>
        <InputComponent type="text" :text="address" @update="onAddressChanged"/>
      </div>
      <div class="field">
        <h2>Shipping Address</h2>
        <InputComponent
        type="text"
        :text="shippingAddress"
        @update="onShippingAddressChanged"/>
      </div>
      <div v-if="paymentCard"> 
        <div class="field">
          <h2>Payment Card</h2>
          <InputComponent type="text" :text="paymentCard.number" @update="onNumberChanged"/>
        </div>
        <div class="field">
          <InputComponent type="text" :text="paymentCard.expires" @update="onExpiresChanged"/>
        </div>
        <div class="field">
          <InputComponent type="text" :text="paymentCard.cvv" @update="onCvvChanged"/>
        </div>
      </div>
      <button v-else type="button" class="payment-card-btn" @click="updateAddCardVisibility">
        Add Payment Card
      </button>
      <button type="button" class="password-btn" @click="updateChangePasswordVisibility">
        ChangePassword
      </button>
      <button type="button" class="submit" @click="submit">Submit</button>
    </div>
  </div>
  <teleport to="#modals">
    <ModalComponent v-model:show="changePasswordVisible">
      <ChangePasswordComponent 
      @updateVisibility="updateChangePasswordVisibility" 
      @alert="onPasswordSubmitted"/>
    </ModalComponent>
    <ModalComponent v-model:show="addCardVisible">
      <AddCardComponent @updateVisibility="updateAddCardVisibility" @alert="onCardSubmitted"/>
    </ModalComponent>
  </teleport>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapMutations } from 'vuex';
import InputComponent from '@/components/InputComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import AddCardComponent from '@/components/AddCardComponent.vue';
import ChangePasswordComponent from '@/components/ChangePasswordComponent.vue';
import { IPaymentCard } from '@/interfaces/IPaymentCard';
import { IUser } from '@/interfaces/IUser';
import Validation from '@/utils/Validation';
import TextConstants from '@/constants/TextConstants';
import RegExprs from '@/constants/RegExprs';
import TimeConstants from '@/constants/TimeConstants';

@Options({
  components: {
    InputComponent,
    AlertComponent,
    ModalComponent,
    AddCardComponent,
    ChangePasswordComponent
  },
  methods: {
    ...mapMutations([
      'storeUserData'
    ])
  },
  computed: {
    ...mapState([
      'userData'
    ])
  }
})
export default class UserPage extends Vue {
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  sex?: string;
  age?: string;
  address?: string;
  shippingAddress?: string;
  paymentCard?: IPaymentCard | null = {
    number: '',
    expires: '',
    cvv: ''
  };
  userData?: IUser;
  storeUserData?: (data) => void;
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
    await fetch(`${TextConstants.connectionStr}/users`)
      .then((res) => res.json())
      .then((data) => { 
        this.users = data 
      })
      .catch((err) => console.log(err.message));
  }

  initialize() {
    this.login = this.userData?.login;
    this.firstName = this.userData?.firstName;
    this.lastName = this.userData?.lastName;
    this.email = this.userData?.email;
    this.password = this.userData?.password;
    this.sex = this.userData?.sex;
    this.age = this.userData?.age;
    this.address = this.userData?.address;
    this.shippingAddress = this.userData?.shippingAddress;
    if (this.userData?.paymentCard) {
      Object.assign(this.paymentCard, this.userData?.paymentCard);
    } else {
      this.paymentCard = null;
    }
  }

  onLoginChanged(value: string) {
    this.login = value;
  }

  onEmailChanged(value: string) {
    this.email = value;
  }

  onFirstNameChanged(value: string) {
    this.firstName = value;
  }

  onLastNameChanged(value: string) {
    this.lastName = value;
  }

  onSexChanged(value: string) {
    this.sex = value;
  }

  onAgeChanged(value: string) {
    this.age = value;
  }

  onAddressChanged(value: string) {
    this.address = value;
  }

  onShippingAddressChanged(value: string) {
    this.shippingAddress = value;
  }

  onNumberChanged(value: string) {
    if (this.paymentCard) {
      this.paymentCard.number = value;
    }
  }

  onExpiresChanged(value: string) {
    if (this.paymentCard) {
      this.paymentCard.expires = value;
    }
  }

  onCvvChanged(value: string) {
    if (this.paymentCard) {
      this.paymentCard.cvv = value;
    }
  }

  updateAddCardVisibility() {
    this.addCardVisible = !this.addCardVisible;
  }

  onCardSubmitted(isErr, message, cardObj) {
    this.error = isErr;
    this.alertMessage = message;
    this.paymentCard = cardObj;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, TimeConstants.alertHideTime);
  }

  updateChangePasswordVisibility() {
    this.changePasswordVisible = !this.changePasswordVisible;
  }

  onPasswordSubmitted(isErr, message, passwordStr) {
    this.error = isErr;
    this.alertMessage = message;
    this.password = passwordStr;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, TimeConstants.alertHideTime);
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
      id: this.userData?.id
    }

    await fetch(`${TextConstants.connectionStr}/users/${this.userData?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (this.storeUserData) {
      this.storeUserData(userData);
    }
    return true;
  }

  checkForm() {
    this.showAlert = true;
    this.alertMessage = TextConstants.successMsg;

    setTimeout(() => {
      this.showAlert = false;
    }, TimeConstants.alertHideTime);

    if (this.login) {
      if (!Validation.checkLogin(this.login)) {
        this.error = true;
        this.alertMessage = TextConstants.wrongLoginMsg;
        return false;
      }
    }

    if (this.email) {
      if (!Validation.checkEmail(this.email)) {
        this.error = true;
        this.alertMessage = TextConstants.wrongEMailMsg;
        return false;
      }
    }

    if (this.email !== this.userData?.email && this.checkCoincidence()) {
      this.error = true;
      this.alertMessage = TextConstants.userExistsMsg;
      return false;
    }
    
    if (!this.checkAge()) {
      this.error = true;
      this.alertMessage = TextConstants.wrongAgeMsg;
      return false;
    }

    if (this.paymentCard) {
      if (!Validation.checkNumber(this.paymentCard.number)) {
        this.error = true;
        this.alertMessage = TextConstants.wrongCardNumberMsg;
        return false;
      }

      if (!Validation.checkExpires(this.paymentCard.expires)) {
        this.error = true;
        this.alertMessage = TextConstants.wrongCardExpiresMsg;
        return false;
      }

      if (!Validation.checkCvv(this.paymentCard.cvv)) {
        this.error = true;
        this.alertMessage = TextConstants.wrongCardCvvMsg;
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
    return this.age?.search(RegExprs.ageRegEx) !== -1;
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
