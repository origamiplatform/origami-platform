import { Component, Inject } from '@angular/core';
import { CategoryService } from '@shared/services/category.service';
import { CategoryNode } from '@core/models/category';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '@core/models/user';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    public categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  hasValue(value: string): boolean {
    return value.length > 0;
  }

  addNode(_name: string) {
    const node = new CategoryNode();
    node.name = _name;
    node.level = 0;
    node.createdBy = this.data.uid;
    this.categoryService.create(node);
  }

  removeNode(_node: CategoryNode) {
    this.categoryService.delete(_node);
  }

  appendChild(_name: string, _parent: CategoryNode) {
    const node = new CategoryNode();
    node.name = _name;
    node.id = uuid();
    node.level = 1;
    node.createdBy = this.data.uid;

    const parent = new CategoryNode(_parent.id, _parent.name, _parent.level);
    parent.children = _.concat(_parent.children, node);
    this.categoryService.update(parent);
  }

  removeChild(_node: CategoryNode, _parent: CategoryNode) {
    const parent = new CategoryNode(_parent.id, _parent.name, _parent.level);
    _.remove(parent.children, o => o.id === _node.id);
    this.categoryService.update(parent);
  }
}
