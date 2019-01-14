export interface Category {
    id?: string;
    name: string;
    depth: number;
    children?: Category[];
}
