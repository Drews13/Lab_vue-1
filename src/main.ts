import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

let errsLogging;
let warnsLogging;

app.config.errorHandler = (err, vm, info) => {
  console.log('APP ERROR:\nError Trace:', err, '\nComponent: ', vm, '\nInfo: ', info);
  const errInfo = { error: err, component: vm, information: info };
  errsLogging.push(errInfo);
}

app.config.warnHandler = (msg, vm, trace) => {
  console.log('APP WARN:\nMessage: ', msg, '\nComponent: ', vm, '\nTrace: ', trace);
  const warnInfo = { message: msg, component: vm, hierarchy: trace };
  warnsLogging.push(warnInfo);
}

app.use(router).mount('#app');
