export function* result<T>(promise: Promise<T>) {
    return (yield promise) as T;
}
