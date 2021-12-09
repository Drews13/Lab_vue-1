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
    @include alertColor($color-green-translucent);
  }

  .alert-component-error {
    @include alertColor($color-red-translucent);
  }
</style>
