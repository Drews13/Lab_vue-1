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
export default class SignInComponent extends Vue {
  users: IUser[] = [];
  authorizedUser: IUser | null = null;
  email = '';
  password = '';
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

  onEmailChanged(value: string) {
    this.email = value;
  }

  onPasswordChanged(value: string) {
    this.password = value;
  }

  checkForm() {
    this.showAlert = true;
    this.alertMessage = TextConstants.successMsg;

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

    const coincidenceResult = this.checkCoincidence();
    if (coincidenceResult !== 2) {
      this.error = true;
      if (coincidenceResult === 0) {
        this.alertMessage = TextConstants.mismatchedEMailMsg;
      } else {
        this.alertMessage = TextConstants.wrongPasswordMsg;
      }
      return false;
    }

    this.error = false;
    setTimeout(() => {
      this.$emit('updateVisibility', false);
    }, TimeConstants.modalCloseTime);

    return true;
  }

  checkCoincidence() {
    const userFound = this.users.find((user) => user.email === this.email);
    if (userFound) {
      if (userFound.password === this.password) {
        this.authorizedUser = userFound;
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
    if (this.userLogin) {
      this.userLogin();
    }
    if (this.storeUserData) {
      this.storeUserData(this.authorizedUser);
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
