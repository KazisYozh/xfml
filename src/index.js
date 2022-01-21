import xfamily from "./App.vue";
// import Vue from "vue";
// export default Vue.component("xfamily", xfamily);

export default {
  install(Vue) {
    Vue.component("xfamily", xfamily);
  }
};

//
// function install(Vue) {
//   if (install.installed) return;
//   install.installed = true;
//   Vue.component("x-family", App);
// }
//
// const plugin = {
//   install
// };
//
// let GlobalVue = null;
// if (typeof window !== "undefined") {
//   GlobalVue = window.Vue;
// } else if (typeof global !== "undefined") {
//   GlobalVue = global.vue;
// }
// if (GlobalVue) {
//   GlobalVue.use(plugin);
// }
//
// App.install = install;
//
// export default App;