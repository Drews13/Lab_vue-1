<template>
  <div class="input-component">
    <input class="input-component__input" 
    :type="type" 
    :placeholder="text" 
    v-model="value" 
    @input="updateSearch">
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
    this.updateSearch();
  }

  updateSearch() {
    this.$emit('update', this.value);
  }
}
</script>

<style lang="scss">
  .input-component {
    height: 70px;

    position: relative;
    &__input {
      color: $color-white;
      background: $color-transparent;
      border: 0;
      @include bottomBorder(1px, $color-white);
      position: absolute;
      left: 0%;
      top: 0%;
      width: calc(100% - 3px);
      height: 70px;
      font-size: 27px;

      &:focus {
        outline: none;
      }
    }

    &__image {
      position: absolute;
      top: 0%;
      right: 0%;
      height: 20px;
      width: 20px;
      cursor: pointer;
    }
  }
</style>
