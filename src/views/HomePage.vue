<template>
  <div class="home-page">
    <h1 class="home-page__title">Home</h1>
    <SectionComponent title="Categories">
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
import sourseData from '../../db.json';
import { ICategory } from '@/interfaces/ICategory';
import CardComponent from '@/components/CardComponent.vue';
import SectionComponent from '@/components/SectionComponet.vue';

@Options({
  components: {
    SectionComponent,
    CardComponent
  }
})
export default class HomePage extends Vue {
  categories: ICategory[] = sourseData.categories
}
</script>

<style lang="scss">
  .home-page {
    &__title {
      @include bottomBorder(3px, $color-grey)
    }
  }
</style>
