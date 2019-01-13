export interface Category {
    name: string;
    depth: number;
    children?: Category[];
}
