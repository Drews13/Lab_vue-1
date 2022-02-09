<template>
  <div class="add-card-component">
    <form>
      <div class="field">
        <InputComponent type="text" :text="numberPlaceholder" @update="onNumberChanged"/>
      </div>
      <div class="field">
        <InputComponent type="text" :text="expiresPlaceholder" @update="onExpiresChanged"/>
      </div>
      <div class="field">
        <InputComponent type="text" :text="cvvPlaceholder" @update="onCvvChanged"/>
      </div>
      <button type="button" class="submit" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/InputComponent.vue';
import Validation from '@/utils/Validation';
import TextConstants from '@/constants/TextConstants';

@Options({
  components: {
    InputComponent
  }
})
export default class AddCardComponent extends Vue {
  number = '';
  expires = '';
  cvv = '';
  numberPlaceholder = TextConstants.cardNumberPlaceholder;
  expiresPlaceholder = TextConstants.cardExpiresPlaceholder;
  cvvPlaceholder = TextConstants.cardCVVPlaveholder;

  onNumberChanged(value: string) {
    this.number = value;
  }

  onExpiresChanged(value: string) {
    this.expires = value;
  }

  onCvvChanged(value: string) {
    this.cvv = value;
  }

  submit() {
    this.$emit('updateVisibility');

    if (!Validation.checkNumber(this.number)) {
      this.$emit('alert', true, TextConstants.wrongCardNumberMsg, null);
      return false;
    }

    if (!Validation.checkExpires(this.expires)) {
      this.$emit('alert', true, TextConstants.wrongCardExpiresMsg, null);
      return false;
    }

    if (!Validation.checkCvv(this.cvv)) {
      this.$emit('alert', true, TextConstants.wrongCardCvvMsg, null);
      return true;
    }

    const paymentCardObj = {
      number: this.number,
      expires: this.expires,
      cvv: this.cvv
    }
    this.$emit('alert', false, TextConstants.successMsg, paymentCardObj);

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
