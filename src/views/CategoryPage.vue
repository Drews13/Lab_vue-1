<template>
  <div class="category-page">
    <h2>{{category.name}}</h2>
    <h3 class="category-page__description">{{category.description}}</h3>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import sourseData from '../../db.json';

export default class CategoryPage extends Vue {
  get categoryId() {
    return parseInt(this.$route.params.id as string, 10)
  }

  get category() {
    return sourseData.categories.find((category) => category.id === this.categoryId)
  }
}
</script>

<style lang="scss">
  .category-page {
    &__description {
      @include bottomBorder(3px, $color-grey)
    }
  }
</style>
