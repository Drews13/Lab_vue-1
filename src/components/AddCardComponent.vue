<template>
  <div class="add-card-component">
    <form>
      <div class="field">
        <InputComponent type="text" text="XXXX XXXX XXXX XXXX" @update="onNumberChanged"/>
      </div>
      <div class="field">
        <InputComponent type="text" text="MM-YYYY" @update="onExpiresChanged"/>
      </div>
      <div class="field">
        <InputComponent type="text" text="CVV" @update="onCvvChanged"/>
      </div>
      <button type="button" class="submit" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import InputComponent from '@/components/InputComponent.vue';
import checkNumber from '@/utils/CardNumberValidation';
import checkExpires from '@/utils/CardExpiresValidation';
import checkCvv from '@/utils/CardCvvValidation';

@Options({
  components: {
    InputComponent
  }
})
export default class AddCardComponent extends Vue {
  number = '';
  expires = '';
  cvv = '';

  onNumberChanged(value) {
    this.number = value;
  }

  onExpiresChanged(value) {
    this.expires = value;
  }

  onCvvChanged(value) {
    this.cvv = value;
  }

  submit() {
    setTimeout(() => {
      this.$emit('updateVisibility');
    }, 1000);

    if (!checkNumber(this.number)) {
      setTimeout(() => {
        this.$emit('alert', true, 'Wrong Number', null);
      }, 1000);
      return false;
    }

    if (!checkExpires(this.expires)) {
      setTimeout(() => {
        this.$emit('alert', true, 'Wrong Expires', null);
      }, 1000);
      return false;
    }

    if (!checkCvv(this.cvv)) {
      setTimeout(() => {
        this.$emit('alert', true, 'Wrong Cvv', null);
      }, 1000);
      return true;
    }

    const paymentCardObj = {
      number: this.number,
      expires: this.expires,
      cvv: this.cvv
    }
    setTimeout(() => {
      this.$emit('alert', false, 'Success', paymentCardObj);
    }, 1000);

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
