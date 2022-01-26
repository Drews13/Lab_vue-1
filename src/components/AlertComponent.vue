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
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    width: 480px;
    margin-top: 10px;
    margin-left: calc(50% - 240px);
    height: 20px;
    color: $color-white;
  }

  .alert-component-success {
    @include alertColor($color-green-translucent);
  }

  .alert-component-error {
    @include alertColor($color-red-translucent);
  }
</style>
