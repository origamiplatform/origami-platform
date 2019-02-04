export class CategoryNode {
    id?: string;
    name: string;
    level: number;
    children: CategoryNode[];

    constructor(id?, name?, level?) {
        id && (this.id = id);
        name && (this.name = name);
        level && (this.level = level);
        this.children = [];
    }
}

export class CategoryFlatNode {
    constructor(
        public expandable: boolean, public name: string, public level: number) { }
}

