<template>
  <div class="header-component">
    <router-link
    class="header-component__logo"
    to="/">
      Game Store
    </router-link>
    <router-link class="header-component__router-link" :to="{name: 'homePage'}">Home</router-link>
    <router-link class="header-component__router-link" :to="{name: 'productsPage'}">
      Products
    </router-link>
    <router-link
    class="header-component__router-link header-component__categories-link"
    :to="{name: 'categoriesPage'}">
        CategoriesPage
        <div class=header-component__dropdown-wrapper>
          <DropdownComponent/>
        </div>
    </router-link>
    <router-link class="header-component__router-link" :to="{name: 'aboutPage'}">About</router-link>
    <div class="authorization-container">
      <div 
      v-if="!this.$store.state.isAuth"
      class="authorization-container__btn"
      @click="showSignIn">
        Sing In
      </div>
      <div 
      v-if="!this.$store.state.isAuth" 
      class="authorization-container__btn"
      @click="showSignUp">
        Sing Up
      </div>
      <router-link 
      v-if="this.$store.state.isAuth"
      class="authorization-container__btn"
      :to="{ name: 'userPage' }">
        {{ this.$store.state.userData.login }}
      </router-link>
      <router-link
      v-if="this.$store.state.isAuth"
      class="authorization-container__btn"
      :to="{ name: 'homePage' }"
      @click="logOut">
        Logout
      </router-link>
    </div>
  </div>
  <teleport to="#modals">
    <ModalComponent v-model:show="signInVisible">
      <SignInComponent @updateVisibility="hideSignIn"/>
    </ModalComponent>
    <ModalComponent v-model:show="signUpVisible">
      <SignUpComponent @updateVisibility="hideSignUp"/>
    </ModalComponent>
  </teleport>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import DropdownComponent from '@/components/DropdownComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import SignInComponent from '@/components/SignInComponent.vue';
import SignUpComponent from '@/components/SignUpComponent.vue';

@Options({
  components: {
    DropdownComponent,
    ModalComponent,
    SignInComponent,
    SignUpComponent
  }
})
export default class HeaderComponent extends Vue {
  signInVisible = false;
  signUpVisible = false;

  showSignIn() {
    this.signInVisible = true;
  }

  showSignUp() {
    this.signUpVisible = true;
  }

  hideSignIn() {
    this.signInVisible = false;
  }

  hideSignUp() {
    this.signUpVisible = false;
  }

  logOut() {
    this.$store.commit('userLogout');
    this.$store.commit('clearUserData');
  }
}
</script>

<style lang='scss' scoped>
  .header-component {
    height: 4rem;
    background: $color-black;
    color: $color-white;
    text-align: right;

    &__router-link {
      padding: 1.5rem 2rem;
      text-decoration: none;
      display: inline-block;
      margin-right: 20px;
      color: $color-white;

      &:hover,
      &:focus {
        color: $color-orange;
      }

      &--active {
        font-weight: bold;
        color: $color-orange;
      }
    }
  
    &__logo {
      margin-left: 10px;
      padding: 1.25rem;
      text-decoration: none;
      float: left;
      color: $color-orange;
      font-weight: bold;
      font-size: 1.5rem;
    }

    &__dropdown-wrapper {
      min-height: 50px;
      display: none;
    }

    &__dropdown-wrapper:hover {
      display: block;
    }

    &__categories-link:hover &__dropdown-wrapper {
      display: block;
      position: absolute;
      left: 0;
      top: 4rem;
      background-color: $color-black-translusent;
      width: 100%;
    }
  }

  .authorization-container {
    border-left: 1px solid $color-authorization-border;
    display: inline-block;
    height: 4rem;
    &__btn {
      text-decoration: none;
      padding: 1.5rem 2rem;
      display: inline-block;
      margin-right: 20px;
      color: $color-white;
      cursor: pointer;

      &:hover,
      &:focus {
        color: $color-orange;
      }
    }
  }
</style>
