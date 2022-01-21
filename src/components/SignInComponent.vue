<template>
  <div class="sign-in-component">
    <AlertComponent 
    v-if="showAlert"
    :isAlertSuccessStyle="!error" 
    :isAlertErrorStyle="error" 
    :message="alertMessage"/>
    <form>
      <div class="field">
        <InputComponent type="text" text="E-Mail" @update="onEmailChanged"/>
      </div>
      <div class="field">
        <InputComponent type="password" text="Password" @update="onPasswordChanged"/>
      </div>
      <button type="button" class="submit" @click="logIn">Sing in</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/InputComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import checkEmail from '@/utils/EmailValidation';
import checkPassword from '@/utils/PasswordValidation';

@Options({
  components: {
    InputComponent,
    AlertComponent
  }
})
export default class SignInComponent extends Vue {
  users: Array<any> = [];
  email = '';
  password = '';
  alertMessage = '';
  error = false;
  showAlert = false;

  async mounted() {
    await fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => { this.users = data })
      .catch((err) => console.log(err.message));
  }

  onEmailChanged(value) {
    this.email = value;
  }

  onPasswordChanged(value) {
    this.password = value;
  }

  checkForm() {
    this.showAlert = true;
    this.alertMessage = 'Success!';
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

    const coincidenceResult = this.checkCoincidence();
    if (coincidenceResult !== 2) {
      this.error = true;
      if (coincidenceResult === 0) {
        this.alertMessage = 'No such user!';
      } else {
        this.alertMessage = 'Wrong password!';
      }
      return false;
    }

    this.error = false;
    setTimeout(() => {
      this.$emit('updateVisibility', false);
    }, 1000);
    return true;
  }

  checkCoincidence() {
    const userFound = this.users.find((user) => user.email === this.email);
    if (userFound) {
      if (userFound.password === this.password) {
        return 2;
      }
      return 1;
    } 
    return 0;
  }

  logIn() {
    if (!this.checkForm()) {
      return false;
    }
    this.$store.commit('userLogin');
    this.$store.commit('storeUserData', { email: this.email, password: this.password });
    return true;
  }
}
</script>

<style lang="scss">

  .field {
    width: 63%;
    padding: 0 18.5%;
    margin-bottom: 19px;
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
