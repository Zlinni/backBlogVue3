/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'lodash-es'
declare interface Window{
  $message: MessageApiInjection
}
declare interface EventTarget{
  innerText:string;
}