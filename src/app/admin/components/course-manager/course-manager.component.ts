import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { StorageService } from '@shared/services/storage.service';
import { CourseService } from '@shared/services/course.service';
import { Course, Lecture } from '@core/models/course';

import { LectureManagerComponent } from '../lecture-manager/lecture-manager.component';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
  ) {

  }

  ngOnInit() {

  }

  openLectureDialog(course: Course): void {
    const dialogRef = this.dialog.open(LectureManagerComponent, {
      width: '100vw',
      height: '80vh',
      data: course
    });
  }

  openCourseDialog(): void {
    const dialogRef = this.dialog.open(CourseDialog, {
      width: '100vw',
      height: '80vh',
    });
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
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  async onFileSet(file: File) {
    this.downloadURL = await this.storageService.uploadVideo(file);
  }

  add(name, description) {
    const lectures: Lecture[] = [];
    const course: Course = { name, description, lectures };
    this.courseService.create(course);
  }

  close(): void {
    this.dialogRef.close();
  }
}
