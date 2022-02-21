<template>
  <div class="header-component">
    <router-link
    class="header-component__logo"
    to="/">
      Game Store
    </router-link>
    <router-link class="header-component__nav-link" :to="{name: 'homePage'}">Home</router-link>
    <router-link class="header-component__nav-link" :to="{name: 'productsPage'}">
      Products
    </router-link>
    <router-link
    class="header-component__nav-link header-component__dropdown-link"
    :to="{name: 'categoriesPage'}">
        Categories
        <div class="header-component__dropdown-wrapper">
          <DropdownComponent/>
        </div>
    </router-link>
    <router-link class="header-component__nav-link" :to="{name: 'aboutPage'}">About</router-link>
    <div class="header-component__container">
      <div 
      v-if="!isAuth"
      class="header-component__container__link"
      @click="updateSignInVisibility">
        Sing In
      </div>
      <div 
      v-if="!isAuth" 
      class="header-component__container__link"
      @click="updateSignUpVisibility">
        Sing Up
      </div>
      <router-link 
      v-if="isAuth"
      class="header-component__container__link"
      :to="{ name: 'userPage' }">
        {{ userData.login }}
      </router-link>
      <div
      v-if="isAuth"
      class="header-component__container__link"
      @click="logOut">
        Logout
      </div>
    </div>
    <div v-if="isAuth" class="header-component__container">
      <router-link class="header-component__container__basket" :to="{ name: 'cartPage' }">
        <img class="basket-image" src="/images/icons/Cart.png">
        <label v-if="itemsInCartCount === 1">1 Item</label>
        <label v-else>{{itemsInCartCount}} Items</label>
      </router-link>
    </div>
    <div v-if="isAdmin" class="header-component__container">
      <router-link class="header-component__container__link" :to="{ name: 'adminPage' }">
        Admin
      </router-link>
    </div>
  </div>
  <teleport to="#modals">
    <ModalComponent v-model:show="signInVisible">
      <SignInComponent @updateVisibility="updateSignInVisibility"/>
    </ModalComponent>
    <ModalComponent v-model:show="signUpVisible">
      <SignUpComponent @updateVisibility="updateSignUpVisibility"/>
    </ModalComponent>
  </teleport>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapMutations, mapGetters } from 'vuex';
import DropdownComponent from '@/components/ui/DropdownComponent.vue';
import ModalComponent from '@/components/ui/ModalComponent.vue';
import SignInComponent from '@/components/user/SignInComponent.vue';
import SignUpComponent from '@/components/user/SignUpComponent.vue';
import { IUser } from '@/interfaces/IUser';

@Options({
  components: {
    DropdownComponent,
    ModalComponent,
    SignInComponent,
    SignUpComponent,
  },
  methods: {
    ...mapMutations([
      'userLogout',
      'clearUserData'
    ])
  },
  computed: {
    ...mapState([
      'isAuth',
      'userData'
    ]),
    ...mapGetters([
      'itemsInCartCount'
    ])
  }
})
export default class HeaderComponent extends Vue {
  signInVisible = false;
  signUpVisible = false;
  isAuth?: boolean;
  userData?: IUser;
  itemsInCartCount?: number;
  userLogout?: () => void;
  clearUserData?: () => void;

  get isAdmin() {
    return this.userData?.role === 'ADMIN';
  }

  updateSignInVisibility() {
    this.signInVisible = !this.signInVisible;
  }

  updateSignUpVisibility() {
    this.signUpVisible = !this.signUpVisible;
  }

  logOut() {
    if (this.userLogout) {
      this.userLogout();
    }
    if (this.clearUserData) {
      this.clearUserData();
    }
    this.$router.push({ name: 'homePage' });
  }
}
</script>

<style lang='scss'>
  .header-component {
    height: 4rem;
    background: $color-black;
    color: $color-white;
    text-align: right;

    &__nav-link {
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

      &:hover {
        display: block;
      }
    }

    &__dropdown-link:hover &__dropdown-wrapper {
      display: block;
      position: absolute;
      left: 0;
      top: 4rem;
      background-color: $color-black-translusent;
      width: 100%;
    }

    &__container {
      border-left: 1px solid $color-authorization-border;
      display: inline-block;
      height: 4rem;
      &__link {
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

      &__basket {
        text-decoration: none;
        padding: 1rem 2rem;
        display: inline-block;
        margin-right: 20px;
        color: $color-white;
        cursor: pointer;
      }
    }
  }

  .basket-image {
    vertical-align: middle;
    padding-right: 0.5rem;
    margin-bottom: 4px;
    height: 2rem;
    width: 2rem;
  }
</style>
