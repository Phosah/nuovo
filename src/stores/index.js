import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      navigation: [],
      products: [],
      singleProduct: {},
      loading: false,
    };
  },
  mutations: {
    SET_CATEGORIES(state, navigation) {
      state.navigation = navigation;
    },

    SET_CATEGORY_PRODUCTS(state, products) {
      state.products = products;
    },

    SET_SINGLE_PRODUCT(state, singleProduct) {
      state.singleProduct = singleProduct;
    },

    START_LOADING(state) {
      state.loading = true;
    },
    STOP_LOADING(state) {
      state.loading = false;
    },
  },
  actions: {
    getCategories({ commit }) {
      axios.get("https://fakestoreapi.com/products/categories").then((res) => {
        commit("SET_CATEGORIES", res.data);
      });
    },

    getCategoryProducts({ commit }, name) {
      commit("START_LOADING");

      axios
        .get("https://fakestoreapi.com/products/category/" + name)
        .then((res) => {
          commit("SET_CATEGORY_PRODUCTS", res.data);

          commit("STOP_LOADING");
        });
    },

    getSingleProduct({ commit, dispatch }, id) {
      commit("START_LOADING");
      console.log(id);
      axios.get("https://fakestoreapi.com/products/" + id).then((res) => {
        commit("SET_SINGLE_PRODUCT", res.data);

        dispatch("getCategoryProducts", res.data.category);

        commit("STOP_LOADING");
      });
    },
  },
});

export default store;
