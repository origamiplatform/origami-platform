import { Component, Inject } from '@angular/core';
import { CategoryService } from '@shared/services/category.service';
import { CategoryNode } from '@core/models/category';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  hasValue(value: string): boolean {
    return value.length > 0;
  }
  submit(input: any, node?: CategoryNode) {
    const name = input.value;
    const newNode = new CategoryNode();
    newNode.name = name;
    newNode.level = 0;

    if (node && node.id) {
      newNode.level = 1;
      const parent = new CategoryNode();
      parent.id = node.id;
      parent.name = node.name;
      parent.level = node.level;
      parent.children = _.concat(node.children, newNode);
      this.categoryService.update(parent);
      // return this.dialogRef.close(parent);
      console.log('update', parent);

    } else {
      this.categoryService.create(newNode);
      // return this.dialogRef.close(child);
      console.log('create');
    }

  }
}
