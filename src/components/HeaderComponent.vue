<template>
  <div class="header-component">
    <router-link
    class="header-component__logo"
    to="/">
      Game Store
    </router-link>
    <router-link class="header-component__router-link" :to="{name: 'homePage'}">Home</router-link>
    <router-link class="header-component__router-link" :to="{name: 'productsPage'}">
      Products
    </router-link>
    <router-link
    class="header-component__router-link header-component__categories-link"
    :to="{name: 'categoriesPage'}">
        CategoriesPage
        <div class=header-component__dropdown-wrapper>
          <DropdownComponent/>
        </div>
    </router-link>
    <router-link class="header-component__router-link" :to="{name: 'aboutPage'}">About</router-link>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import DropdownComponent from '@/components/DropdownComponent.vue';

@Options({
  components: {
    DropdownComponent
  }
})
export default class HeaderComponent extends Vue {

}
</script>

<style lang='scss' scoped>
  .header-component {
    height: 4rem;
    background: $color-black;
    color: $color-white;
    text-align: right;

    &__router-link {
      padding: 1.5rem 2rem;
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
      margin-left: 10px;
      padding: 1.25rem;
      text-decoration: none;
      float: left;
      color: $color-orange;
      font-weight: bold;
      font-size: 1.5rem;
    }

    &__dropdown-wrapper {
      min-height: 50px;
      display: none;
    }

    &__dropdown-wrapper:hover {
      display: block;
    }

    &__categories-link:hover &__dropdown-wrapper {
      display: block;
      position: absolute;
      left: 0;
      top: 4rem;
      background-color: $color-black-translusent;
      width: 100%;
    }
  }
</style>
