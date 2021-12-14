<template>
  <div class="categories-page">
    <h2 class="categories-page__title">Categories</h2>
    <ul class="categories-page__items-list">
      <li class="categories-page__items"
      v-for="category in categories"
      :key="category.id">
        <router-link
        class="categories-page__router-link"
        :to="{name: 'categoryPage', params:{id: category.id}}">
          <CardComponent :category="category"/>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import sourseData from '../../db.json';
import { ICategory } from '@/interfaces/ICategory';
import CardComponent from '@/components/CardComponent.vue';

@Options({
  components: {
    CardComponent
  }
})
export default class CategoriesPage extends Vue {
  categories: ICategory[] = sourseData.categories
}
</script>

<style lang="scss" scoped>
  .categories-page {
    &__title {
      @include bottomBorder(3px, $color-grey)
    }

    &__items-list {
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      text-align: center;
      background: $color-white;
    }

    &__items {
      list-style-type: none;
    }

    &__router-link {
      padding: 1.5rem 2rem;
      text-decoration: none;
      display: inline-block;
      color: $color-black;

      &:hover,
      &:focus {
        color: $color-orange;
      }
    }
  }
</style>
