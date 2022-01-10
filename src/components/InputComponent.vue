<template>
  <div class="input-component">
    <input class="input-component__input" :type="type" :placeholder="text" :value="value"
    @input="value = $event.target.value">
    <img class="input-component__image" src="/images/icons/Cross.png" @click="clearValue">
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

type InputType = 'text' | 'password';

@Options({
  props: {
    type: {
      type: String as () => InputType,
      require: true
    },
    text: {
      type: String
    }
  }
})
export default class InputComponent extends Vue {
  value = ''

  clearValue() {
    this.value = '';
  }
}
</script>

<style lang="scss">
  .input-component {
    position: relative;
    &__input {
      position: absolute;
      left: 0%;
      top: 0%;
      width: 100%;
      height: 70px;
      font-size: 18px;
    }

    &__image {
      position: absolute;
      top: 0%;
      right: 0%;
      height: 20px;
      width: 20px;
    }
  }
</style>
