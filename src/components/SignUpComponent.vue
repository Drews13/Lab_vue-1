<template>
  <div class="sign-up-component">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :isAlertErrorStyle="error"
    :message="alertMessage"/>
    <form>
      <div class="field">
        <InputComponent type="text" text="Login" @update="onLoginChanged"/>
      </div>
      <div class="field">
        <InputComponent type="text" text="E-Mail" @update="onEmailChanged"/>
      </div>
      <div class="field">
        <InputComponent type="password" text="Password" @update="onPasswordChanged"/>
      </div>
      <div class="field">
        <InputComponent type="password" text="Repeat Password" @update="onRepeatPasswordChanged"/>
      </div>
      <button type="button" class="submit" @click="authorize">Sing up</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapMutations } from 'vuex';
import InputComponent from '@/components/InputComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import { IUser } from '@/interfaces/IUser';
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
  users: IUser[] = [];
  login = '';
  email = '';
  password = '';
  repeatedPassword = '';
  alertMessage = '';
  error = false;
  showAlert = false;
  userLogin?: () => void;
  storeUserData?: (data) => void;

  async mounted() {
    await fetch(`${TextConstants.connectionStr}/users`)
      .then((res) => res.json())
      .then((data) => { 
        this.users = data 
      })
      .catch((err) => console.log(err.message));
  }

  onLoginChanged(value) {
    this.login = value;
  }

  onEmailChanged(value) {
    this.email = value;
  }

  onPasswordChanged(value) {
    this.password = value;
  }

  onRepeatPasswordChanged(value) {
    this.repeatedPassword = value;
  }

  checkForm() {
    this.showAlert = true;
    this.alertMessage = TextConstants.successMsg;

    if (!Validation.checkLogin(this.login)) {
      this.error = true;
      this.alertMessage = TextConstants.wrongLoginMsg;
      return false;
    }

    if (!Validation.checkEmail(this.email)) {
      this.error = true;
      this.alertMessage = TextConstants.wrongEMailMsg;
      return false;
    }

    if (!Validation.checkPassword(this.password)) {
      this.error = true;
      this.alertMessage = TextConstants.shortPasswordMsg;
      return false;
    }

    if (!Validation.checkPasswordsEquality(this.password, this.repeatedPassword)) {
      this.error = true;
      this.alertMessage = TextConstants.mismatchedPasswordMsg;
      return false;
    }

    if (this.checkCoincidence()) {
      this.error = true;
      this.alertMessage = TextConstants.userExistsMsg;
      return false;
    }
    
    this.error = false;
    setTimeout(() => {
      this.$emit('updateVisibility', false);
    }, TimeConstants.modalCloseTime);
    return true;
  }

  checkCoincidence() {
    if (this.users.find((user) => user.email === this.email)) {
      return true;
    } 
    return false;
  }

  async authorize() {
    if (!this.checkForm()) {
      return false;
    }

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
      id: this.users.length + 1
    }

    await fetch(`${TextConstants.connectionStr}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authorizedUser)
    });

    if (this.userLogin) {
      this.userLogin();
    }

    if (this.storeUserData) {
      this.storeUserData(authorizedUser);
    }
    return true;
  }
}
</script>

<style lang="scss">
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

  .submit {
    padding: 13px;
    margin: 15px 18.5%;
    line-height: 24px;
    color: $color-white;
    background-color: $color-green;
    border: none;
    width: 63%;
  }
</style>
