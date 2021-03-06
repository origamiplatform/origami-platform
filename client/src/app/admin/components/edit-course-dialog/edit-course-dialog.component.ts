import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from '@shared/services/storage.service';
import { CourseService } from '@shared/services/course.service';
import { Lecture, Course } from '@core/models/course';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { FormGroup, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { CategoryService } from '@shared/services/category.service';
import { User } from '@core/models/user';

@Component({
  selector: 'edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss']
})
export class EditCourseDialogComponent {
  selectedLectureIndex: number;
  course$: Observable<Course>;
  course: Course;
  formGroup: FormGroup;

  subscription: Subscription;
  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private storageService: StorageService,
    private courseService: CourseService,
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: any, user: User } // courseId
  ) {
    this.formGroup = this.formBuilder.group({
      course: this.formBuilder.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
        category: [null, Validators.required],
        imageUrl: [null, Validators.required],
      }),
      lectures: this.formBuilder.array([]),
      newLecture: this.formBuilder.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
        videoUrl: [null, Validators.required],
      }),
    });
  
    // this.formGroup.get('newLecture').get('videoUrl').disable();

    this.course$ = this.courseService.getById(data.courseId);
    this.course$.subscribe(course => this.onInit(course));
  }


  onInit(course: Course) {
    this.course = course;

    this.formGroup.patchValue({ course: course });
    this.updateLectureGroups(course.lectures);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.formGroup.valueChanges.subscribe(change => this.onUpdate(change));
  }

  onUpdate(_update) {
    this.course = {
      id: this.course.id,
      imageUrl: this.course.imageUrl,
      lectures: this.course.lectures,
      ..._update.course
    }; 
  }

  createLectureGroup(data: Lecture): FormGroup {
    return this.formBuilder.group({
      ...data
    });
  }

  updateLectureGroups(lectures: Lecture[]) {
    this.formGroup.setControl('lectures', new FormArray([]));
    const controls = lectures.map(el => this.createLectureGroup(el));
    controls.forEach(el => (<FormArray>this.formGroup.controls['lectures']).push(el));
  }

  async onNewLectureFileSet(file: File) {
    const downloadURL = await this.storageService.uploadVideo(file);
    const videoUrl = await downloadURL.toPromise();
    this.formGroup.get('newLecture').patchValue({ videoUrl: videoUrl });
  }

  async onEditLectureFileSet(file: File, lecture: Lecture, index: number) {
    this.selectedLectureIndex = index;
    const cleaned: Lecture[] = _.map(this.course.lectures, o => {
      o.id === lecture.id && (o.videoUrl = null);
      return o;
    });
    this.updateLectureGroups(cleaned);

    const downloadURL = await this.storageService.uploadVideo(file);
    const videoUrl = await downloadURL.toPromise();
    const update: Lecture[] = _.map(this.course.lectures, o => {
      o.id === lecture.id && (o.videoUrl = videoUrl);
      return o;
    });
    this.updateLectureGroups(update);
    this.selectedLectureIndex = null;
  }

  async addLecture() {
    const id = uuid();
    const control = this.formGroup.get('newLecture');
    const createdBy = this.data.user.uid;

    const lecture: Lecture = { id, createdBy, update: true, ...control.value };

    const currentLectures = _.clone(this.course.lectures) || [];
    const updatedLectures = _.concat(currentLectures, lecture);

    const update = _.clone(this.course);
    update.lectures = updatedLectures;

    this.courseService.update(update);
    control.reset();
  }

  async updateLecture(lecture: Lecture) {
    const update = _.map(this.course.lectures, o => {
      if (o.id !== lecture.id) return o;
      lecture.update = true;
      return lecture
    });

    this.course.lectures = update;
    this.courseService.update(this.course);
  }
  removeLecture(lecture: Lecture) {
    const update = _.map(this.course.lectures, o => {
      if (o.id !== lecture.id) return o;
      lecture.delete = true;
      return lecture
    });
    this.course.lectures = update;
    this.courseService.delete(this.course);
  }
  getFormControl(target: string): AbstractControl {
    return this.formGroup.get(target);
  }

  close(): void {
    this.dialogRef.close();
  }

  saveChange() {
    this.course.update = true;
    this.courseService.update(this.course);
  }

  removeCourse() {
    const clone = _.cloneDeep(this.course);
    clone.delete = true;
    clone.lectures.forEach(lecture => lecture.delete = true);
    this.courseService.delete(clone);
  }
}

