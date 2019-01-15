import { Component, OnInit, Inject } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { CategoryService } from '@shared/services/category.service';
import { CategoryNode, CategoryFlatNode } from '@shared/models/database';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { FlatTreeControl } from '@angular/cdk/tree';
import * as _ from 'lodash';

@Component({
  selector: 'category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit {
  treeControl: FlatTreeControl<CategoryFlatNode>;
  treeFlattener: MatTreeFlattener<CategoryNode, CategoryFlatNode>;
  dataSource: MatTreeFlatDataSource<CategoryNode, CategoryFlatNode>;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<CategoryFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.categoryService.categories$.subscribe(data => this.onCategoriesUpdate(data));
  }

  onCategoriesUpdate(categories: CategoryNode[]) {
    this.dataSource.data = categories;
  }

  transformer = (node: CategoryNode, level: number) => {
    return new CategoryFlatNode(!!node.children, node.name, level);
  }

  private _isExpandable = (node: CategoryFlatNode) => node.expandable;

  private _getChildren = (node: CategoryNode): Observable<CategoryNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: CategoryFlatNode) => _nodeData.expandable;
  private _getLevel = (node: CategoryFlatNode) => node.level;

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '100vw',
      height: '80vh',
      data: this.categoryService.categories$
    });

    dialogRef.afterClosed().subscribe(category => {
      if (category) {
        console.log('The dialog was closed', category);
        if (category.children) {
          this.categoryService.update(category);
        } else {
          this.categoryService.create(category);
        }
      }
    });
  }
}


@Component({
  selector: 'category-dialog',
  templateUrl: './dialog.html',
})
export class CategoryDialog {
  newCategoryName: string;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Observable<CategoryNode[]>) {
  }

  submit(c?: CategoryNode) {
    const category = new CategoryNode();
    category.name = this.newCategoryName;
    category.level = 0;

    const copy = _.clone(c);

    if (c && c.id) {
      category.level = 1;
      if (!copy.children) {
        copy.children = [];
      }
      copy.addChild(category);
      return this.dialogRef.close(copy);
    }
    return this.dialogRef.close(category);
  }

  close(): void {
    this.dialogRef.close();
  }
}
