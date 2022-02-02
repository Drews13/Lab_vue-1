<template>
  <div class="category-page" v-if="categories.length">
    <h2>{{category.name}}</h2>
    <h3 class="category-page__description">{{category.description}}</h3>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { ICategory } from '@/interfaces/ICategory';
import TextConstants from '@/constants/TextConstants';

export default class CategoryPage extends Vue {
  categories: ICategory[] = [];

  async mounted() {
    await fetch(`${TextConstants.connectionStr}/categories`)
      .then((res) => res.json())
      .then((data) => { 
        this.categories = data; 
      })
      .catch((err) => console.log(err.message));
  }
  get categoryId() {
    return parseInt(this.$route.params.id as string, 10)
  }

  get category() {
    return this.categories.find((category) => category.id === this.categoryId)
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
