<template>
  <div>
    <slot></slot>
    <AlertComponent v-if="err" :isAlertSuccessStyle="!err" :message="err.message"/>
    <AlertComponent v-else :isAlertSuccessStyle="err" :message="successMsg"/>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import AlertComponent from '@/components/alert/AlertComponent.vue';
import TextConstnants from '@/constants/TextConstants';

@Options({
  components: {
    AlertComponent
  }
})
export default class ErrorBoundary extends Vue {
  err = false;
  vm = null;
  info = null;
  successMsg = TextConstnants.successMsg;

  errorCaptured(err, vm, info) {
    this.err = err;
    this.vm = vm;
    this.info = info;
    return false;
  }
}
</script>
