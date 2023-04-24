interface CSSProps {
    width: number | string;
    height: number | string;
}

type CSSProperties = Partial<CSSProps>;

// configures the creation of small css objects { width and height }
export function createStyleMap<T extends { [name: string]: CSSProperties }>(cfg: T): T {
    return cfg;
}
