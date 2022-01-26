import { Store } from 'vuex';
import { IState } from '@/interfaces/IState';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<IState>;
  }
}
