<template>
  <div class="change-password-component">
    <form>
      <div class="field">
        <InputComponent type="password"
        :text="currentPasswordPlaceholder"
        v-model="currentPassword"/>
      </div>
      <div class="field">
        <InputComponent type="password" :text="newPasswordPlaceholder" v-model="newPassword"/>
      </div>
      <div class="field">
        <InputComponent
        type="password"
        :text="repeatPasswordPlaceholder"
        v-model="repeatedPassword"/>
      </div>
      <button type="button" class="submit" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState } from 'vuex';
import InputComponent from '@/components/ui/InputComponent.vue';
import Validation from '@/utils/Validation';
import TextConstants from '@/constants/TextConstants';
import { IUser } from '@/interfaces/IUser';

@Options({
  components: {
    InputComponent
  },
  computed: {
    ...mapState([
      'userData'
    ])
  }
})
export default class ChangePasswordComponent extends Vue {
  currentPassword = '';
  newPassword = '';
  repeatedPassword = '';
  userData?: IUser;
  currentPasswordPlaceholder = TextConstants.currentPasswordPlaceholder;
  newPasswordPlaceholder = TextConstants.newPasswordPlaceholder;
  repeatPasswordPlaceholder = TextConstants.repeatPasswordPlaceholder;

  submit() {
    this.$emit('updateVisibility');

    if (!this.checkCoincidence()) {
      this.$emit('alert', true, TextConstants.wrongCurrPasswordMsg, null);
      return false;
    }

    if (!Validation.checkPassword(this.newPassword)) {
      this.$emit('alert', true, TextConstants.shortPasswordMsg, null);
      return false;
    }

    if (!Validation.checkPasswordsEquality(this.newPassword, this.repeatedPassword)) {
      this.$emit('alert', true, TextConstants.mismatchedPasswordMsg, null);
      return false;
    }
    
    this.$emit('alert', false, TextConstants.successMsg, this.newPassword);

    return true;
  }

  checkCoincidence() {
    return this.currentPassword === this.userData?.password;
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
