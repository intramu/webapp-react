interface CSSProps {
    width: number | string;
    height: number | string;
}

type CSSProperties = Partial<CSSProps>;

export function createStyleMap<T extends { [name: string]: CSSProperties }>(cfg: T): T {
    return cfg;
}
