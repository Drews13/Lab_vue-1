<template>
  <div class="category-page">
    <h2>{{category.name}}</h2>
    <h3 class="category-page__description">{{category.description}}</h3>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { ICategory } from '@/interfaces/ICategory';
import TextConstants from '@/constants/TextConstants';

export default class CategoryPage extends Vue {
  category: ICategory = {} as ICategory;

  async mounted() {
    await fetch(`${TextConstants.connectionStr}/categories/${this.$route.params.id}`)
      .then((res) => res.json())
      .then((data) => { 
        this.category = data; 
      })
      .catch((err) => console.log(err.message));
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
