<template>
  <div class="footer-component">
    Increddible Convenient
    <FooterComponentIcons/>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import FooterComponentIcons from '@/components/footer/FooterIconsComponent.vue';

@Options({
  components: {
    FooterComponentIcons
  }
})
export default class FooterComponent extends Vue {

}
</script>

<style lang='scss' scoped>
  .footer-component {
    background-color: $color-black;
    padding: 30px;
    color: $color-white;
    text-align: center;
  }
</style>
