import { createStore } from "vuex";

const store = createStore({
  state: {
    cart: [],
  },
  mutations: {
    ADD_TO_CART(state, products) {
      state.cart.push(products);
    },
  },
  actions:{
        addToCart({commit}, product){
            commit('ADD_TO_CART', product)
        }
  },
  getters:{
        cartItem: state=>  state.cart,
        cartItemCount: state=> state.cart.length || 0
  }
});

export default store;
