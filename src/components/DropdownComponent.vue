<template>
  <div class="header-component__dropdown">
    <ul class="header-component__dropdown__items-list">
      <li class="header-component__dropdown__items"
      v-for="category in categories"
      :key="category.id">
        <router-link 
        class="header-component__dropdown__router-link"
        :to="{name: 'categoryPage', params:{id: category.id}}">
          {{category.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import sourseData from '../../db.json';
import { ICategory } from '@/interfaces/ICategory';
import CardComponent from '@/components/CardComponent.vue'

@Options({
  components: {
    CardComponent
  }
})
export default class DropdownComponent extends Vue {
  categories: ICategory[] = sourseData.categories
}
</script>

<style lang="scss" scoped>
  .header-component {
    &__dropdown {
      margin: 0px 30px;
      color: $color-white;
      text-align: left;
      font-weight: normal;

      &__items-list {
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
      }

      &__items {
        list-style-type: none;
      }

      &__router-link {
        padding: 1.5rem 2rem;
        text-decoration: none;
        display: inline-block;
        color: $color-white;

        &:hover,
        &:focus {
          color: $color-orange;
        }
      }
    }
  }
</style>
