export class CategoryNode {
    id?: string;
    name: string;
    level: number;
    children?: CategoryNode[];

    public addChild(n: CategoryNode) { this.children.push(n); }
}

export class CategoryFlatNode {
    constructor(
        public expandable: boolean, public name: string, public level: number) { }
}
