<template>
  <div class="change-password-component">
    <form>
      <div class="field">
        <InputComponent type="password" text="Current Password" @update="onCurrentPasswordChanged"/>
      </div>
      <div class="field">
        <InputComponent type="password" text="New Password" @update="onNewPasswordChanged"/>
      </div>
      <div class="field">
        <InputComponent type="password" text="Repeat Password" @update="onRepeatedPasswordChanged"/>
      </div>
      <button type="button" class="submit" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState } from 'vuex';
import InputComponent from '@/components/InputComponent.vue';
import checkPassword from '@/utils/PasswordValidation';
import checkPasswordsEquality from '@/utils/PasswordsEquality';

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
  userData: any;

  onCurrentPasswordChanged(value) {
    this.currentPassword = value;
  }

  onNewPasswordChanged(value) {
    this.newPassword = value;
  }

  onRepeatedPasswordChanged(value) {
    this.repeatedPassword = value;
  }

  submit() {
    this.$emit('updateVisibility');

    if (!this.checkCoincidence()) {
      this.$emit('alert', true, 'Wrong current password!', null);
      return false;
    }

    if (!checkPassword(this.newPassword)) {
      this.$emit('alert', true, 'Password cannot be less then 5 characters!', null);
      return false;
    }

    if (!checkPasswordsEquality(this.newPassword, this.repeatedPassword)) {
      this.$emit('alert', true, 'Passwords do not match!', null);
      return true;
    }
    
    this.$emit('alert', false, 'Success', this.newPassword);
    return true;
  }

  checkCoincidence() {
    return this.currentPassword === this.userData.password;
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
