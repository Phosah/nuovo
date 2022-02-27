import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      navigation: [],
      title: "Efosa",
    };
  },
  mutations: {
    CHANGE_TITLE(state, title) {
      state.title = title;
    },
    SET_CATEGORIES(state, navigation) {
      state.navigation = navigation;
    },
  },
  actions: {
    getCategories({ commit }) {
      axios.get("https://fakestoreapi.com/products/categories").then((res) => {
        commit("SET_CATEGORIES", res.data);
        commit("CHANGE_TITLE", "done");
        console.log(res.data);
      });
    },
  },
});

export default store;

// const getCategories = () => {
//   axios.get("https://fakestoreapi.com/products/categories").then((res) => {
//     console.log(res.data);
//     navigation.value = res.data;
//   });
// };
