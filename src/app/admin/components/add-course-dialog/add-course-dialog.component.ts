import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

import { StorageService } from '@shared/services/storage.service';
import { CourseService } from '@shared/services/course.service';
import { Course, Lecture } from '@core/models/course';

import { CategoryService } from '@shared/services/category.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.scss']
})
export class AddCourseDialogComponent {
  courseForm: FormGroup;
  downloadURL$: Observable<string>;

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private storageService: StorageService,
    private courseService: CourseService,
    public categoryService: CategoryService,
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
