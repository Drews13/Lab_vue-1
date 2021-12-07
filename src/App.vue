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
import AlertComponent from '@/components/AlertComponent.vue';
import ErrorBoundary from '@/components/ErrorBoundary.vue';

import '@/assets/normalize.css';
import '@/assets/main-styles.scss';
import '@/assets/colors.scss';

@Options({
  components: {
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    ErrorBoundary
  }
})
export default class App extends Vue {
  
}
</script>

<style lang='scss'>
  .app-content {
    margin: 0 30px;
  }
</style>
