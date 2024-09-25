import { cache } from "react";
import { neshCache } from "@neshca/cache-handler/functions";

export interface NeshCacheOptions {
  tags?: string[];
  revalidate?: number | false;
  argumentsSerializer?: (args: any[]) => string;
  resultSerializer?: (result: any) => string;
  resultDeserializer?: (data: string) => any;
}

type AsyncFunction = (...args: any[]) => Promise<any>;

interface NeshCacheFunction {
  <T extends AsyncFunction>(
    fn: T,
    opts?: NeshCacheOptions,
  ): (...args: Parameters<T>) => Promise<ReturnType<T>>;
}

/**
 * Function to add react cache and neshCache functionality to a query function.
 *
 * @param fn The function to cache
 * @param opts The options for the cache
 * @returns A cached version of the function
 *
 * @example
 *
 * // Function to fetch something
 * async function fetchSomething(param) {
 *   return await ...;
 * }
 * // Cache the fetchSomething function
 * const cachedFunction = queryCacher(fetchSomething);
 *
 * // With options
 * const cachedFunction = queryCacher(fetchSomething, { tags: ['tag1', 'tag2'], revalidate: 1000 });
 *
 * // Use the cached function
 * async function getSomething(param) {
 *  return await cachedFunction(param);
 * }
 */
export const queryCacher: NeshCacheFunction = <T extends AsyncFunction>(
  fn: T,
  opts: NeshCacheOptions = {}, // Default to empty object if not provided
) =>
  cache(async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return await neshCache(fn)(opts, ...args);
  });
