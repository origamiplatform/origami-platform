import { Component, Inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { StorageService } from '@shared/services/storage.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CourseService } from '@shared/services/course.service';
import { Course } from '@core/models/course';

@Component({
  selector: 'course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CourseDialog, {
      width: '100vw',
      height: '80vh',
    });

    // dialogRef.afterClosed().subscribe(category => {
    //   if (category) {
    //     console.log('The dialog was closed', category);
    //     if (category.children.length > 0) {
    //       this.categoryService.update(category);
    //     } else {
    //       this.categoryService.create(category);
    //     }
    //   }
    // });
  }
}

@Component({
  selector: 'course-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.scss']
})
export class CourseDialog {
  downloadURL: Observable<string>;

  constructor(
    public dialogRef: MatDialogRef<CourseDialog>,
    private storageService: StorageService,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  async onFileSet(file: File) {
    this.downloadURL = await this.storageService.uploadVideo(file);
  }

  close(): void {
    this.dialogRef.close();
  }
}
