declare global {
  type ParamsBase = Record<string, string | undefined>;

  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  export interface LayoutProps<Params extends ParamsBase = {}> {
    children?: React.ReactNode;

    params: Params;
  }

  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  export interface PageProps<Params extends ParamsBase = {}, SearchParams extends ParamsBase = {}> {
    params: Params;
    searchParams?: SearchParams;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  export type QueryReturnType<T extends (...args: any) => any> =
    Awaited<ReturnType<T>> extends Array<infer U> ? Prettify<U> : Prettify<Awaited<ReturnType<T>>>;

  export type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};
}

export type {};
