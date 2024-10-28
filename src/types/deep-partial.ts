export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type DeepPartialWithUndefined<T> = {
    [K in keyof T]: T[K] extends object ? DeepPartialWithUndefined<T[K]> | undefined : T[K] | undefined;
};
