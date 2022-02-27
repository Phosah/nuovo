import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      navigation: [],
      products: [],
    };
  },
  mutations: {
    SET_CATEGORIES(state, navigation) {
      state.navigation = navigation;
    },

    SET_CATEGORY_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    getCategories({ commit }) {
      axios.get("https://fakestoreapi.com/products/categories").then((res) => {
        commit("SET_CATEGORIES", res.data);
      });
    },

    getCategoryProducts({ commit }, name) {
      console.log(name);
      axios
        .get("https://fakestoreapi.com/products/category/" + name)
        .then((res) => {
          console.log(res.data);
          commit("SET_CATEGORY_PRODUCTS", res.data);
        });
    },
  },
});

export default store;
