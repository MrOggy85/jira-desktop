/* eslint-disable @typescript-eslint/no-explicit-any */

type ExtractPromise<T> = T extends PromiseLike<infer U> ? U : T;

type PromiseReturnType<T extends (...args: any) =>
Promise<any>> = T extends (...args: any) => Promise<infer U> ? U : any;
