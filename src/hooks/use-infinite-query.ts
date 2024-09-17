'use client';

import {
  type DefaultError,
  type QueryKey,
  type QueryMeta,
  type UseSuspenseQueryOptions,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';

type QueryFn<T = unknown, TQueryKey extends QueryKey = QueryKey> = (context: {
  queryKey: TQueryKey;
  signal: AbortSignal;
  meta: QueryMeta | undefined;
  pageParam: number;
  lastItem?: T;
}) => T[] | Promise<T[]>;

type BaseOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseSuspenseQueryOptions<TData[], TError, TData[], TQueryKey>, 'queryFn'>;

type Options<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = BaseOptions<TQueryFnData, TError, TData, TQueryKey> & {
  queryFn: QueryFn<TData, TQueryKey>;
};

export const useInfiniteQuery = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<Options<TQueryFnData, TError, TData, TQueryKey>, 'queryFn'> & {
    queryFn: QueryFn<TData>;
  }
) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const queryKey = !Number.isNaN(options.queryKey[options.queryKey.length - 1])
    ? [...options.queryKey].slice(0, options.queryKey.length - 1)
    : options.queryKey;

  const prevQueryKey = useRef<QueryKey>(
    page === 1 ? [...options.queryKey] : ([...queryKey, page] as unknown as TQueryKey)
  );

  const query = useSuspenseQuery({
    ...options,
    // queryKey: options.queryKey,
    // @ts-expect-error
    queryKey:
      page === 1 ? [...options.queryKey] : ([...options.queryKey, page] as unknown as TQueryKey),
    queryFn: async ({ signal, meta, queryKey }) => {
      const newerItems = queryClient.getQueryData<TData[]>(prevQueryKey.current) ?? ([] as TData[]);

      if (!options.queryFn || typeof options.queryFn !== 'function') return newerItems;

      if (page > 1) {
        console.log(page, newerItems);
        //   prevQueryKey.current = [...prevQueryKey.current, page];
        // return olderItems
        const olderItems = (await options.queryFn({
          queryKey: queryKey as TQueryKey,
          meta: meta,
          signal: signal,
          pageParam: page,
          lastItem: newerItems[0]
        })) as TData[];
        console.log(page, olderItems, newerItems);
        return [...olderItems, ...newerItems];
      }

      return newerItems;

      //   queryClient.setQueryData<TData[]>(prevQueryKey.current, newerItems => {

      //     return [...olderItems, ...(newerItems || [])];
      //   });

      //   return [...olderItems, ...newerItems];

      //   prevQueryKey.current = [...prevQueryKey.current, page];
    }
  });

  const fetchNextPage = useCallback(() => {
    setPage(prevPage => {
      prevQueryKey.current =
        prevPage === 1 ? [...options.queryKey] : ([...queryKey, prevPage] as unknown as TQueryKey);

      return prevPage + 1;
    });
  }, [queryKey, options.queryKey]);

  return { ...query, fetchNextPage };
};
