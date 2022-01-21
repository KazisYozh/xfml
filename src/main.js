import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from './store';

Vue.use(ElementUI);

const handlers = new Map();

function updateHandler(el, binding) {
  el.removeEventListener('input', handlers.get(el));

  const handler = () => {
    const value = el.value.replace(/\D/g, '').slice(0, binding.value);
    if (value !== el.value) {
      el.value = value;
      el.dispatchEvent(new Event('input'));
    }
  };
  handler();
  handlers.set(el, handler);

  el.addEventListener('input', handler);
}

Vue.directive('maxlen', {
  bind: updateHandler,
  update: updateHandler,
  unbind(el) {
    el.removeEventListener('input', handlers.get(el));
    handlers.delete(el);
  },
});

new Vue({
  el: '#app-xfamily',
  store,
  render: h => h(App),
  data: () => ({
    values: [ 50 ],
    maxLen: 2,
    useMaxLen: true,
  }),
});
