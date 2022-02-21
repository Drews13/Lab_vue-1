import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { IState } from '@/interfaces/IState';
import { IUser } from '@/interfaces/IUser';
import { IError } from '@/interfaces/IError';
import { IWarning } from '@/interfaces/IWarning';
import { IProduct } from '@/interfaces/IProduct';

const store = createStore<IState>({
  plugins: [createPersistedState({})],

  state: {
    isAuth: false,
    userData: null,
    cartItems: [],
    warnings: [],
    errors: [],
  },

  mutations: {
    userLogin(state) {
      state.isAuth = true;
    },

    userLogout(state) {
      state.isAuth = false;
    },

    storeUserData(state, data: IUser) {
      state.userData = data;
    },

    clearUserData(state) {
      state.userData = null;
      state.cartItems = [];
    },

    addCartItem(state, data: IProduct) {
      const cartItem = {
        product: data,
        categoryId: data.categoriesId[0],
        quantity: 1
      }
      state.cartItems.push(cartItem);
    },

    removeCartItem(state, id: number) {
      const index = state.cartItems.findIndex((item) => item.product.id === id);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
    },

    changeItemQuantity(state, data: {id:number, term: number}) {
      const foundItem = state.cartItems.find((item) => item.product.id === data.id);
      if (foundItem) {
        foundItem.quantity += data.term;
      }
    },

    changeItemCategory(state, data: {itemId: number, categoryId: number}) {
      const foundItem = state.cartItems.find((item) => item.product.id === data.itemId);
      if (foundItem) {
        foundItem.categoryId = data.categoryId;
      }
    },

    clearCart(state) {
      state.cartItems = [];
    },

    storeWarning(state, data: IWarning) {
      if (state.warnings.length < 5) {
        state.warnings.push(data);
      } else {
        state.warnings.shift();
        state.warnings.push(data);
      }
    },

    storeError(state, data: IError) {
      if (state.errors.length < 5) {
        state.errors.push(data);
      } else {
        state.errors.shift();
        state.errors.push(data);
      }
    }
  },

  getters: {
    findItemById: (state) => (id: number) => !!state.cartItems
      .find((item) => item.product.id === id),
    itemsInCartCount: (state) => state.cartItems.length,
    totalCost: (state) => {
      const initialValue = 0;
      return state.cartItems.reduce(
        (previous, current) => previous + current.product.price * current.quantity,
        initialValue
      ).toFixed(2);
    }
  }
});

export default store;
