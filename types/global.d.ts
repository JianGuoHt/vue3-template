export {};

declare global {
  declare type Recordable<T = any> = Record<string, T>;
  declare interface ViteEnv {
    // 是否开启mock
    VITE_USE_MOCK: boolean;
    // 生产环境 开启mock
    VITE_GLOB_PROD_MOCK: boolean;
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>;
}
