/**
 * Used for generators in mobx to return api value correctly
 */
export function* result<T>(promise: Promise<T>) {
    return (yield promise) as T;
}
