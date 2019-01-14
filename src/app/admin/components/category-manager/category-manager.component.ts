import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '@shared/services/database.service';
import { Category } from '@shared/models/database';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
  selector: 'category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private db: DatabaseService,
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '100vw',
      height: '80vh',
      data: this.db.categoryCollection.valueChanges()
    });

    dialogRef.afterClosed().subscribe(category => {
      if (category) {
        console.log('The dialog was closed', category);
        if (category.children) {
          this.db.updateCategory(category);
        } else {
          this.db.addCategory(category);
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
    @Inject(MAT_DIALOG_DATA) public data: Observable<Category[]>) {
    console.log(data);
  }

  submit(c?: Category) {
    const category: Category = {
      name: this.newCategoryName,
      depth: 0
    };
    if (c && c.id) {
      category.depth = 1;
      if (!c.children) {
        c.children = [];
      }
      c.children.push(category);
      return this.dialogRef.close(c);
    }
    return this.dialogRef.close(category);
  }

  close(): void {
    this.dialogRef.close();
  }
}
