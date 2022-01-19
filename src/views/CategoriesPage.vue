<template>
  <div class="categories-page">
    <h2 class="categories-page__title">Categories</h2>
    <SectionComponent>
      <div
      v-for="category in categories"
      :key="category.id">
        <CardComponent :category="category"/>
      </div>
    </SectionComponent>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ICategory } from '@/interfaces/ICategory';
import CardComponent from '@/components/CardComponent.vue';
import SectionComponent from '@/components/SectionComponet.vue';

@Options({
  components: {
    CardComponent,
    SectionComponent
  }
})
export default class CategoriesPage extends Vue {
  categories: ICategory[] = [];

  async mounted() {
    await fetch('http://localhost:3000/categories')
      .then((res) => res.json())
      .then((data) => { this.categories = data })
      .catch((err) => console.log(err.message))
  }
}
</script>

<style lang="scss" scoped>
  .categories-page {
    &__title {
      @include bottomBorder(3px, $color-grey)
    }
  }
</style>
