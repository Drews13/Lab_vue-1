<template>
  <section class="section-component">
    <h4>{{title}}</h4>
    <div class="section-component__content">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    title: {
      type: String
    }
  }
})
export default class SectionComponent extends Vue {

}
</script>

<style lang="scss">
  .section-component {
    padding: 10px 10px 100px 10px;
    margin-bottom: 20px;
    background: $color-black-translusent;
    &__content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      text-align: center;
    }
  }
</style>
