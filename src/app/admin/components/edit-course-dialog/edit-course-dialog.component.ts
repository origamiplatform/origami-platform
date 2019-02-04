import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { StorageService } from '@shared/services/storage.service';
import { CourseService } from '@shared/services/course.service';
import { Lecture, Course } from '@core/models/course';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss']
})
export class EditCourseDialogComponent {
  courseForm: FormGroup;
  downloadURL: Observable<string>;

  interval: any;
  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private storageService: StorageService,
    private courseService: CourseService,
    public categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: Course) {
    this.courseForm = new FormGroup({
      name: new FormControl(data.name, Validators.required),
      description: new FormControl(data.description, Validators.required),
      category: new FormControl(data.category, Validators.required),
    });

    this.courseForm.valueChanges.subscribe(change => this.onUpdate(change));
  }

  onUpdate(_update) {
    const course: Course = {
      id: this.data.id,
      imageUrl: this.data.imageUrl,
      ..._update
    };

    this.interval && (clearInterval(this.interval));
    this.interval = setInterval(() => this.courseService.update(course), 500);
  }

  async onFileSet(file: File) {
    this.downloadURL = await this.storageService.uploadVideo(file);
  }

  async addLecture(name = '', description = '') {
    if (!this.downloadURL) { return; }
    const videoUrl = await this.downloadURL.toPromise();
    const id = uuid();

    const lecture: Lecture = { id, name, description, videoUrl };

    const currentLectures = _.clone(this.data.lectures);
    const updatedLectures = _.concat(currentLectures, lecture);

    const copy = _.clone(this.data);
    copy.lectures = updatedLectures;
    // this.data.lectures = updatedLectures;
    this.courseService.update(copy);
  }

  getFormControl(target): AbstractControl {
    return this.courseForm.controls[target];
  }

  close(): void {
    this.dialogRef.close();
  }
}
