<template>
  <div class="card-component">
    <router-link
    class="card-component__link"
    :to="{name: 'categoryPage', params:{categoryName: category.name}}">
      <img class="card-component__image"
      :src="`/images/categoriesLogos/${category.image}`"
      @error="defaultImage">
      <h3>{{category.name}}</h3>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ICategory } from '@/interfaces/ICategory';

@Options({
  props: {
    category: {
      type: Object as ()=> ICategory,
      required: true
    }
  }
})
export default class CardComponent extends Vue {
  defaultImage(e) {
    e.target.src = '/images/notFound/notFound3.png';
  }
}
</script>

<style lang="scss">
  .card-component {
    margin: 0px 10px 20px 10px;
    background: $color-black;
    border: 5px solid $color-white;
    border-bottom: 10px solid $color-white;
    border-radius: 20px;
    width: 1fr;

    &__image {
      width: 200px;
      height: 200px;
    }

    &__link {
      width: 100%;
      padding: 1.5rem 0;
      text-decoration: none;
      display: inline-block;
      color: $color-white;

      &:hover,
      &:focus {
        color: $color-orange;
      }
    }

    &:hover,
    &:focus {
      border-color: $color-orange;
    }
  }
</style>
