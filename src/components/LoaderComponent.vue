<template>
  <div class="loader-component">
    <div class="lds-hourglass"></div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class LoaderComponent extends Vue {

}
</script>

<style lang="scss">
  .loader-component {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    background: $color-black-translusent;
  }

  .lds-hourglass {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
  }

  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 40px solid $color-white;
    border-color: $color-white transparent $color-white transparent;
    animation: lds-hourglass 1.2s infinite;
  }

  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
</style>
