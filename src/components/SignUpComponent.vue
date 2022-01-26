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
import InputComponent from '@/components/InputComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import { IUser } from '@/interfaces/IUser';
import checkEmail from '@/utils/EmailValidation';
import checkPassword from '@/utils/PasswordValidation';
import checkLogin from '@/utils/LoginValidation';
import checkPasswordsEquality from '@/utils/PasswordsEquality';

@Options({
  components: {
    InputComponent,
    AlertComponent
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

  async mounted() {
    await fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => { this.users = data })
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
    this.alertMessage = 'Success!';

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

    if (!checkPassword(this.password)) {
      this.error = true;
      this.alertMessage = 'Password cannot be less then 5 characters!';
      return false;
    }

    if (!checkPasswordsEquality(this.password, this.repeatedPassword)) {
      this.error = true;
      this.alertMessage = 'Passwords do not match!';
      return false;
    }

    if (this.checkCoincidence()) {
      this.error = true;
      this.alertMessage = 'Such user already exists';
      return false;
    }
    
    this.error = false;
    setTimeout(() => {
      this.$emit('updateVisibility', false);
    }, 1000);
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

    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authorizedUser)
    });

    authorizedUser.id = 4;
    this.$store.commit('userLogin');
    this.$store.commit('storeUserData', authorizedUser);
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
