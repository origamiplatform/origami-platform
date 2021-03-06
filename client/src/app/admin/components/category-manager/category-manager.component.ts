import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Observable, of as observableOf } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { CategoryService } from '@shared/services/category.service';
import { CategoryNode, CategoryFlatNode } from '@core/models/category';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { User } from '@core/models/user';

@Component({
  selector: 'category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit {
  treeControl: FlatTreeControl<CategoryFlatNode>;
  treeFlattener: MatTreeFlattener<CategoryNode, CategoryFlatNode>;
  dataSource: MatTreeFlatDataSource<CategoryNode, CategoryFlatNode>;
  user: User;

  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private categoryService: CategoryService,
  ) {
    this.auth.user$.subscribe(data => this.user = data);
  }

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
    const expandable = node.children ? node.children.length > 0 : false;
    return new CategoryFlatNode(expandable, node.name, level);
  }

  private _isExpandable = (node: CategoryFlatNode) => node.expandable;

  private _getChildren = (node: CategoryNode): Observable<CategoryNode[]> => observableOf(node.children);

  // tslint:disable-next-line:no-shadowed-variable
  hasChild = (_: number, _nodeData: CategoryFlatNode) => _nodeData.expandable;
  private _getLevel = (node: CategoryFlatNode) => node.level;

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '100vw',
      height: '80vh',
      data: this.user
    });
  }
}
