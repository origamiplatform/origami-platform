export class CategoryNode {
    id?: string;
    name: string;
    level: number;
    children: CategoryNode[];

    constructor() {
        this.children = [];
    }
}

export class CategoryFlatNode {
    constructor(
        public expandable: boolean, public name: string, public level: number) { }
}
