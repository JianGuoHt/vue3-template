import { DialogApi, LoadingBarApi, MessageApi, NotificationApi } from 'naive-ui';

export {};

declare global {
  declare type Recordable<T = any> = Record<string, T>;
  declare interface ViteEnv {
    // 是否开启mock
    VITE_USE_MOCK: boolean;
    // 生产环境 开启mock
    VITE_GLOB_PROD_MOCK: boolean;
  }

  interface Window {
    // naive 脱离上下文的 API
    $loadingBar: LoadingBarApi;
    $dialog: DialogApi;
    $message: MessageApi;
    $notification: NotificationApi;
  }

  // 用户信息
  declare interface UserInfo {
    // 头像
    avatar?: string;
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
