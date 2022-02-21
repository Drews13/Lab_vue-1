<template>
  <div class="user-page">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :message="alertMessage"/>
    <h1 class="user-page__title">My Account</h1>
    <div class="user-page__content">
      <div class="field">
        <h2>Login</h2>
        <InputComponent type="text" v-model="login"/>
      </div>
      <div class="field">
        <h2>E-Mail</h2>
        <InputComponent type="text" v-model="email"/>
      </div>
      <div class="field">
        <h2>First Name</h2>
        <InputComponent type="text" v-model="firstName"/>
      </div>
      <div class="field">
        <h2>Last Name</h2>
        <InputComponent type="text" v-model="lastName"/>
      </div>
      <div class="field">
        <h2>Sex</h2>
        <InputComponent type="text" v-model="sex"/>
      </div>
      <div class="field">
        <h2>Age</h2>
        <InputComponent type="text" v-model="age"/>
      </div>
      <div class="field">
        <h2>Address</h2>
        <InputComponent type="text" v-model="address"/>
      </div>
      <div class="field">
        <h2>Shipping Address</h2>
        <InputComponent type="text" v-model="shippingAddress"/>
      </div>
      <div v-if="paymentCard"> 
        <div class="field">
          <h2>Payment Card</h2>
          <InputComponent type="text" :mask="cardNumberMask" v-model="paymentCard.number"/>
        </div>
        <div class="field">
          <InputComponent type="text" :mask="cardExpiresMask" v-model="paymentCard.expires"/>
        </div>
        <div class="field">
          <InputComponent type="text" :mask="cardCvvMask" v-model="paymentCard.cvv"/>
        </div>
      </div>
      <button
      v-else
      type="button"
      class="user-page__content__payment-card-btn"
      @click="updateAddCardVisibility">
        Add Payment Card
      </button>
      <button
      type="button"
      class="user-page__content__password-btn"
      @click="updateChangePasswordVisibility">
        ChangePassword
      </button>
      <button type="button" class="user-page__content__submit" @click="submit">Submit</button>
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
import InputComponent from '@/components/ui/InputComponent.vue';
import AlertComponent from '@/components/alert/AlertComponent.vue';
import ModalComponent from '@/components/ui/ModalComponent.vue';
import AddCardComponent from '@/components/user/AddCardComponent.vue';
import ChangePasswordComponent from '@/components/user/ChangePasswordComponent.vue';
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
  role?: string;
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
  showAlert = false;
  alertMessage = '';
  error = false;
  changePasswordVisible = false;
  addCardVisible = false;
  cardNumberMask = TextConstants.CardNumberMask;
  cardExpiresMask = TextConstants.CardExpiresMask;
  cardCvvMask = TextConstants.CardCvvMask;

  created() {
    this.initialize();
  }

  initialize() {
    this.login = this.userData?.login;
    this.role = this.userData?.role;
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

  updateAddCardVisibility() {
    this.addCardVisible = !this.addCardVisible;
  }

  onCardSubmitted(isErr, message, cardObj) {
    this.alert(isErr, message);
    if (!isErr) {
      this.paymentCard = cardObj;
    }
  }

  updateChangePasswordVisibility() {
    this.changePasswordVisible = !this.changePasswordVisible;
  }

  onPasswordSubmitted(isErr, message, passwordStr) {
    this.alert(isErr, message);
    if (!isErr) {
      this.password = passwordStr;
    }
  }

  async submit() {
    const validForm = await this.checkForm();
    if (validForm) {
      const userData = {
        login: this.login,
        role: this.role,
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
    }
  }

  async checkForm() {
    if (this.login) {
      if (!Validation.checkLogin(this.login)) {
        this.alert(true, TextConstants.wrongLoginMsg);
        return false;
      }
    }

    if (this.email) {
      if (!Validation.checkEmail(this.email)) {
        this.alert(true, TextConstants.wrongEMailMsg);
        return false;
      }
    }

    const coincidenceResult = await this.checkCoincidence();
    if (this.email !== this.userData?.email && coincidenceResult) {
      this.alert(true, TextConstants.userExistsMsg);
      return false;
    }
    
    if (!this.checkAge()) {
      this.alert(true, TextConstants.wrongAgeMsg);
      return false;
    }

    if (this.paymentCard) {
      if (!Validation.checkExpires(this.paymentCard.expires)) {
        this.alert(true, TextConstants.wrongCardExpiresMsg);
        return false;
      }
    }
    this.alert(false, TextConstants.successMsg);
    return true;
  }

  async checkCoincidence() {
    let result = false;
    await fetch(`${TextConstants.connectionStr}/users?email_like=${this.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          result = true;
        }
      })
      .catch((err) => console.log(err.message));
    return result;
  }

  checkAge() {
    return this.age?.search(RegExprs.ageRegEx) !== -1;
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
  .user-page {
    &__title {
      @include bottomBorder(3px, $color-grey);
    }

    &__content {
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

      &__payment-card-btn {
        padding: 13px;
        margin-bottom: 30px;
        line-height: 24px;
        color: $color-black;
        background-color: $color-orange;
        border: none;
        width: 100%;
      }

      &__password-btn {
        padding: 13px;
        margin-bottom: 30px;
        line-height: 24px;
        background-color: $color-white;
        border: none;
        width: 100%;
      }
    }
  }

  .field {
    color: $color-white;
    width: 100%;
    padding: 0;
    margin-bottom: 30px;
  }
</style>
