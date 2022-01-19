<template>
  <div class="modal-component" v-if="show" @click="this.$emit('update:show', false)">
    <div @click.stop class="modal-component__content">
      <img 
      class="modal-component__image" 
      src="/images/icons/CrossSquare.png" 
      @click="this.$emit('update:show', false)">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    show: Boolean,
    default: false
  }
})
export default class Modal extends Vue {
  
}

</script>

<style lang="scss">
  .modal-component {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    background: $color-black-translusent;
    font-family: Avenir, Helvetica, Arial, sans-serif;

    &__content {
      background: $color-black;
      position: absolute;
      top: 100px;
      left: calc(44% - 260px);
      width: 520px;
      padding: 6%;
    }

    &__image {
      position: absolute;
      top: 0%;
      right: 0%;
      height: 30px;
      width: 30px;
      cursor: pointer;
    }
  }
</style>
