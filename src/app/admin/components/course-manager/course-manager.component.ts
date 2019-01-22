import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { StorageService } from '@shared/services/storage.service';
import { CourseService } from '@shared/services/course.service';
import { Course, Lecture } from '@core/models/course';

import { LectureManagerComponent } from '../lecture-manager/lecture-manager.component';
import { CategoryService } from '@shared/services/category.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

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
  courseForm: FormGroup;
  downloadURL$: Observable<string>;

  constructor(
    public dialogRef: MatDialogRef<CourseDialog>,
    private storageService: StorageService,
    private courseService: CourseService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.courseForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        category: new FormControl(null, Validators.required),
        imageUrl: new FormControl(null, Validators.required)
      });
  }

  async onFileSet(file: File) {
    this.downloadURL$ = await this.storageService.uploadVideo(file);
  }

  add() {
    const lectures: Lecture[] = [];
    const course: Course = { lectures, ...this.courseForm.value };

    console.log(course);
    console.log(this.courseForm);

    this.courseService.create(course);
  }

  onImageLoaded(url) {
    this.courseForm.controls['imageUrl'].setValue(url);
  }

  getFormControl(target): AbstractControl {
    return this.courseForm.controls[target];
  }
  close(): void {
    this.dialogRef.close();
  }
}
