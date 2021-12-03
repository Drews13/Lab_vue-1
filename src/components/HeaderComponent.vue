<template>
  <div class="header-component">
    <router-link
    class="header-component__logo header-component__router-link" 
    to="/">
      Game Store
    </router-link>
    <router-link class="header-component__router-link" to="/">Home</router-link>
    <router-link class="header-component__router-link" to="/products">Products</router-link>
    <router-link class="header-component__router-link" to="/about">About</router-link>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component';

export default class HeaderComponent extends Vue {

}
</script>

<style lang='scss' scoped>
  .header-component {
    margin-top: 0;
    padding: 30px;
    background: $color-black;
    color: $color-white;
    text-align: right;
  
    &__router-link {
      text-decoration: none;
      display: inline-block;
      margin-right: 20px;
      color: $color-white;

      &:hover,
      &:focus {
        color: $color-orange;
      }

      &--active {
        font-weight: bold;
        color: $color-orange;
      }
    }
  
    &__logo {
      float: left;
      color: $color-orange;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
</style>
