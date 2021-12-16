<template>
  <div>
    <slot></slot>
    <AlertComponent v-if="err" :isAlertErrorStyle="true" :message="err.message"/>
    <AlertComponent v-else :isAlertSuccessStyle="true" message="OK"/>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import AlertComponent from '@/components/AlertComponent.vue';

@Options({
  components: {
    AlertComponent
  }
})
export default class ErrorBoundary extends Vue {
  err = false
  vm = null
  info = null

  errorCaptured(err, vm, info) {
    this.err = err;
    this.vm = vm;
    this.info = info;
    return false;
  }
}
</script>
