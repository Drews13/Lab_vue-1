<template>
  <div :class="['alert-component', 
  { 'alert-component-success': isAlertSuccessStyle, 'alert-component-error': isAlertErrorStyle  }]">
    <slot></slot>
  </div>
</template>

<script>
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
  }  
})
export default class AlertComponent extends Vue {

}
</script>

<style lang="scss" scoped>
  .alert-component {
    position: fixed;
    top: 65%;
    margin-left: 50%;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    width: 480px;
    left: -240px;
    height: 20px;
  }

  .alert-component-success {
    background: $color-green-translucent;
  }

  .alert-component-error {
    background: $color-red-translucent;
  }
</style>
