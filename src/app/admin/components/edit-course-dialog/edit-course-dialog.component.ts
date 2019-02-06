import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from '@shared/services/storage.service';
import { CourseService } from '@shared/services/course.service';
import { Lecture, Course } from '@core/models/course';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { FormGroup, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss']
})
export class EditCourseDialogComponent {
  course$: Observable<Course>;
  course: Course;
  formGroup: FormGroup;
  downloadURL: Observable<string>;

  subscription: Subscription;
  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private storageService: StorageService,
    private courseService: CourseService,
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string // courseId
  ) {
    this.formGroup = this.formBuilder.group({
      course: this.formBuilder.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
        category: [null, Validators.required],
        imageUrl: [null, Validators.required],
      }),
      lectures: this.formBuilder.array([])
    });
    this.course$ = this.courseService.getObservableById(data);
    this.course$.subscribe(course => this.onInit(course));
  }

  onInit(course: Course) {
    this.formGroup.patchValue({ course: course, lectures: [] });
    const lectures = course.lectures.map(el => this.createLectureGroup(el));
    lectures.forEach(el => (<FormArray>this.formGroup.controls['lectures']).push(el));

    this.course = course;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.formGroup.valueChanges.subscribe(change => this.onUpdate(change));

    console.log(this.formGroup);
  }

  onUpdate(_update) {
    const course: Course = {
      id: this.course.id,
      imageUrl: this.course.imageUrl,
      ..._update
    };

    console.log('update');
  }

  createLectureGroup(data: Lecture): FormGroup {
    const cleanData = _.omit(data, ['id', 'videoUrl']);
    return this.formBuilder.group({
      ...cleanData
    });
  }

  async onFileSet(file: File) {
    this.downloadURL = await this.storageService.uploadVideo(file);
  }

  async addLecture(name = '', description = '') {
    if (!this.downloadURL) { return; }
    const videoUrl = await this.downloadURL.toPromise();
    const id = uuid();

    const lecture: Lecture = { id, name, description, videoUrl };

    const currentLectures = _.clone(this.course.lectures);
    const updatedLectures = _.concat(currentLectures, lecture);

    const update = _.clone(this.course);
    update.lectures = updatedLectures;
    this.courseService.update(update);
  }

  getFormControl(target: string): AbstractControl {
    return this.formGroup.get(target);
  }

  close(): void {
    this.dialogRef.close();
  }
}
