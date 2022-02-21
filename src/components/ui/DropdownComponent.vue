<template>
  <div class="dropdown-component">
    <ul class="dropdown-component__items-list">
      <li class="dropdown-component__item"
      v-for="category in categories"
      :key="category.id">
        <router-link 
        class="dropdown-component__link"
        :to="{name: 'categoryPage', params:{categoryName: category.name}}">
          {{category.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { ICategory } from '@/interfaces/ICategory';
import TextConstants from '@/constants/TextConstants';

export default class DropdownComponent extends Vue {
  categories: ICategory[] = [];

  async mounted() {
    await fetch(`${TextConstants.connectionStr}/categories`)
      .then((res) => res.json())
      .then((data) => { 
        this.categories = data 
      })
      .catch((err) => console.log(err.message))
  }
}
</script>

<style lang="scss" scoped>
  .dropdown-component {
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

    &__item {
      list-style-type: none;
    }

    &__link {
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
</style>
