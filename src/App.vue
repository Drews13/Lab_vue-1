<template>
  <HeaderComponent/>
  <div class="app-content">
    <router-view></router-view>
  </div>
  <FooterComponent/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import '@/assets/normalize.css';
import '@/assets/main-styles.scss';
import '@/assets/colors.scss';

@Options({
  components: {
    HeaderComponent,
    FooterComponent
  }
})
export default class App extends Vue {
  
}
</script>

<style lang='scss'>
  .app-content {
    margin-left: 30px;
  }
</style>
