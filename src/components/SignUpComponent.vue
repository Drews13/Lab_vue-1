<template>
  <div class="sign-up-component">
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
      <div class="field">
        <InputComponent type="password" text="Repeat Password" @update="onRepeatPasswordChanged"/>
      </div>
      <button type="button" class="submit" @click="checkForm">Sing up</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/InputComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';

@Options({
  components: {
    InputComponent,
    AlertComponent
  }
})
export default class SignUpComponent extends Vue {
  users:Array<any> = [];
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

  onEmailChanged(value) {
    this.email = value;
  }

  onPasswordChanged(value) {
    this.password = value;
  }

  onRepeatPasswordChanged(value) {
    this.repeatedPassword = value;
  }

  async checkForm() {
    this.showAlert = true;
    this.alertMessage = 'Success!';
    if (!this.checkEmail()) {
      this.error = true;
      this.alertMessage = 'Wrong E-Mail!';
      return false;
    }

    if (!this.checkPassword()) {
      this.error = true;
      this.alertMessage = 'Password cannot be less then 5 characters!';
      return false;
    }

    if (!this.checkPasswordsEquality()) {
      this.error = true;
      this.alertMessage = 'Passwords do not match!';
      return false;
    }

    if (this.checkCoincidence()) {
      this.error = true;
      this.alertMessage = 'Such user already exists';
      return false;
    }
    
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
    });
    this.error = false;
    setTimeout(() => {
      this.$emit('updateVisibility', false);
    }, 1000);
    return true;
  }

  checkEmail() {
    const regExp = /^.+@.+\..+$/;
    return this.email.search(regExp) !== -1
  }

  checkPassword() {
    return this.password.length > 4;
  }

  checkPasswordsEquality() {
    return this.password === this.repeatedPassword;
  }

  checkCoincidence() {
    if (this.users.find((user) => user.email === this.email)) {
      return true;
    } 
    return false;
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
