<template>
  <div class="sign-up-component">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :message="alertMessage"/>
    <form>
      <div class="field">
        <InputComponent type="text" :text="loginPlaceholder" v-model="login"/>
      </div>
      <div class="field">
        <InputComponent type="text" :text="emailPlaceholder" v-model="email"/>
      </div>
      <div class="field">
        <InputComponent type="password" :text="passwordPlaceholder" v-model="password"/>
      </div>
      <div class="field">
        <InputComponent
        type="password"
        :text="repeatedPasswordPlaceholder"
        v-model="repeatedPassword"/>
      </div>
      <button type="button" class="sign-up-component__submit" @click="authorize">Sing up</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapMutations } from 'vuex';
import InputComponent from '@/components/ui/InputComponent.vue';
import AlertComponent from '@/components/alert/AlertComponent.vue';
import Validation from '@/utils/Validation';
import TextConstants from '@/constants/TextConstants';
import TimeConstants from '@/constants/TimeConstants';

@Options({
  components: {
    InputComponent,
    AlertComponent
  },
  methods: {
    ...mapMutations([
      'userLogin',
      'storeUserData'
    ])
  }
})
export default class SignUpComponent extends Vue {
  login = '';
  email = '';
  password = '';
  repeatedPassword = '';
  alertMessage = '';
  error = false;
  showAlert = false;
  userLogin?: () => void;
  storeUserData?: (data) => void;
  loginPlaceholder = TextConstants.loginPlaceholder;
  emailPlaceholder = TextConstants.emailPlaceholder;
  passwordPlaceholder = TextConstants.passwordPlaceholder;
  repeatedPasswordPlaceholder = TextConstants.repeatPasswordPlaceholder;

  async checkForm() {
    if (!Validation.checkLogin(this.login)) {
      this.alert(true, TextConstants.wrongLoginMsg);
      return false;
    }

    if (!Validation.checkEmail(this.email)) {
      this.alert(true, TextConstants.wrongEMailMsg);
      return false;
    }

    if (!Validation.checkPassword(this.password)) {
      this.alert(true, TextConstants.shortPasswordMsg);
      return false;
    }

    if (!Validation.checkPasswordsEquality(this.password, this.repeatedPassword)) {
      this.alert(true, TextConstants.mismatchedPasswordMsg);
      return false;
    }

    const coincidenceResult = await this.checkCoincidence();
    if (coincidenceResult) {
      this.alert(true, TextConstants.userExistsMsg);
      return false;
    }

    this.alert(false, TextConstants.successMsg);
    this.$emit('updateVisibility', false);
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

  async authorize() {
    const validForm = await this.checkForm();
    if (validForm) {
      const authorizedUser = {
        login: this.login,
        role: 'USER',
        firstName: '',
        lastName: '',
        email: this.email, 
        password: this.password,
        sex: '',
        age: '0',
        address: '',
        shippingAddress: '',
        paymentCard: null,
        id: 0
      }
      await fetch(`${TextConstants.connectionStr}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authorizedUser)
      })
        .then((res) => res.json())
        .then((data) => {
          authorizedUser.id = data.id;
        })
        .catch((err) => console.log(err.message));

      if (this.userLogin) {
        this.userLogin();
      }

      if (this.storeUserData) {
        this.storeUserData(authorizedUser);
      }
    }
  }
}
</script>

<style lang="scss">
  .sign-up-component {
    &__submit {
      padding: 13px;
      margin: 15px 18.5%;
      line-height: 24px;
      color: $color-white;
      background-color: $color-green;
      border: none;
      width: 63%;
    }
  }

  .field {
    width: 63%;
    padding: 0 18.5%;
    margin-bottom: 19px;
    &__title {
      margin-bottom: 11px;
    }

    &__input {
      padding: 12px;
      width: calc(100% - 2px);
      border: 1px solid $color-grey;
    }
  }
</style>
