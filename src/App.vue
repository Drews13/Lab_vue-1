<template>  
  <HeaderComponent/>
  <div class="app-content">
    <router-view></router-view>
  </div>
  <FooterComponent/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import FooterComponent from '@/components/footer/FooterComponent.vue';

import '@/assets/normalize.css';
import '@/assets/main-styles.scss';

@Options({
  components: {
    HeaderComponent,
    FooterComponent,
  }
})
export default class App extends Vue {
  
}
</script>
