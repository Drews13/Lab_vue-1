<template>
  <div class="admin-page">
    <h1 class="admin-page__title">Admin</h1>
    <router-link :to="{ name: 'adminProductsPage' }">
      <button class="admin-page__products-btn">Products list</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class AdminPage extends Vue {

}
</script>

<style lang="scss">
  .admin-page {
    &__title {
      @include bottomBorder(3px, $color-grey);
    }

    &__products-btn {
      cursor: pointer;
      padding: 25px;
      margin-top: 20px;
      line-height: 24px;
      color: $color-white;
      background-color: $color-green;
      border: none;
      width: 100%;
    }
  }
</style>
