<template>
  <div class="sign-in-component">
    <AlertComponent
    v-if="showAlert"
    :isAlertSuccessStyle="!error"
    :message="alertMessage"/>
    <form>
      <div class="field">
        <InputComponent type="text" :text="emailPlaceholder" v-model="email"/>
      </div>
      <div class="field">
        <InputComponent type="password" :text="passwordPlaceholder" v-model="password"/>
      </div>
      <button type="button" class="sign-in-component__submit" @click="logIn">Sing in</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapMutations } from 'vuex';
import InputComponent from '@/components/ui/InputComponent.vue';
import AlertComponent from '@/components/alert/AlertComponent.vue';
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
  user: IUser = {} as IUser;
  email = '';
  password = '';
  alertMessage = '';
  error = false;
  showAlert = false;
  userLogin?: () => void;
  storeUserData?: (data) => void;
  emailPlaceholder = TextConstants.emailPlaceholder;
  passwordPlaceholder = TextConstants.passwordPlaceholder;

  async checkForm() {
    if (!Validation.checkEmail(this.email)) {
      this.alert(true, TextConstants.wrongEMailMsg);
      return false;
    }

    if (!Validation.checkPassword(this.password)) {
      this.alert(true, TextConstants.shortPasswordMsg);
      return false;
    }

    const coincidenceResult = await this.checkCoincidence();
    if (coincidenceResult !== 2) {
      if (coincidenceResult === 0) {
        this.alert(true, TextConstants.mismatchedEMailMsg);
      } else {
        this.alert(true, TextConstants.wrongPasswordMsg);
      }
      return false;
    }

    this.alert(false, TextConstants.successMsg);
    setTimeout(() => {
      this.$emit('updateVisibility', false);
    }, TimeConstants.alertHideTime);

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
    await fetch(`${TextConstants.connectionStr}/users?email_like=${this.email}`)
      .then((res) => res.json())
      .then((data) => {
        this.user = data[0] as IUser;
      })
      .catch((err) => console.log(err.message));
    if (this.user) {
      if (this.user.password === this.password) {
        return 2;
      }
      return 1;
    }
    return 0;
  }

  async logIn() {
    const validForm = await this.checkForm();
    if (validForm) {
      if (this.userLogin) {
        this.userLogin();
      }
      if (this.storeUserData) {
        this.storeUserData(this.user);
      }
    }
  }
}
</script>

<style lang="scss">
  .sign-in-component {
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
  }
</style>
