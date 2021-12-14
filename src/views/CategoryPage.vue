<template>
  <div>
    <h2>{{category.name}}</h2>
    <h3>{{category.description}}</h3>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import sourseData from '../../db.json';

@Options({
})
export default class CategoryPage extends Vue {
  get categoryId() {
    return parseInt(this.$route.params.id as string, 10)
  }

  get category() {
    return sourseData.categories.find((category) => category.id === this.categoryId)
  }
}
</script>

<style>

</style>
