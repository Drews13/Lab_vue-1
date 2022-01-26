import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { IError } from '@/interfaces/IError'
import { IWarning } from '@/interfaces/IWarning'

const app = createApp(App);

const errsLogging: IError[] = [];
const warnsLogging: IWarning[] = [];

app.config.errorHandler = (err, vm, info) => {
  console.log('APP ERROR:\nError Trace:', err, '\nComponent: ', vm, '\nInfo: ', info);
  const errInfo = { error: err, component: vm, information: info };
  errsLogging.push(errInfo);
  store.commit('storeError', errInfo);
}

app.config.warnHandler = (msg, vm, trace) => {
  console.log('APP WARN:\nMessage: ', msg, '\nComponent: ', vm, '\nTrace: ', trace);
  const warnInfo = { message: msg, component: vm, hierarchy: trace };
  warnsLogging.push(warnInfo);
  store.commit('storeWarning', warnInfo);
} 

app.use(router).use(store).mount('#app');
