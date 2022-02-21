<template>
  <div :class="['alert-component', 
   isAlertSuccessStyle ? 'alert-component--green' : 'alert-component--red']">
    {{ message }}
  </div>
</template>

<script lang='ts'>
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    isAlertSuccessStyle: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  }
})
export default class AlertComponent extends Vue {

}
</script>

<style lang="scss" scoped>
  .alert-component {
    position: absolute;
    top: 65px;
    left: 30px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: bold;
    color: $color-white;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    width: calc(100% - 60px);

    &--green {
      @include alertColor($color-green-translucent);
    }

    &--red {
      @include alertColor($color-red-translucent);
    }
  }
</style>
