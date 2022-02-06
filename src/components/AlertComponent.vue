<template>
  <div :class="['alert-component', 
  { 'alert-component-success': isAlertSuccessStyle, 'alert-component-error': isAlertErrorStyle  }]">
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
    isAlertErrorStyle: {
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
  }

  .alert-component-success {
    @include alertColor($color-green-translucent);
  }

  .alert-component-error {
    @include alertColor($color-red-translucent);
  }
</style>
