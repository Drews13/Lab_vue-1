<template>
  <div class="header-component__dropdown__card-component">
    <img class="header-component__dropdown__card-component__image"
    :src="`/images/categoriesLogos/${category.image}`">
    <h3>{{category.name}}</h3>
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
  
}
</script>

<style lang="scss">
  .header-component {
    &__dropdown {
      &__card-component {
        color: $color-white;
        background: $color-black;
        border: 5px solid $color-white;
        border-bottom: 10px solid $color-white;
        border-radius: 20px;
        
        &__image {
          width: 120px;
          height: 120px;
        }

        &:hover,
        &:focus {
          border-color: $color-orange;
          color: $color-orange;
        }
      }
    }
  }
</style>
