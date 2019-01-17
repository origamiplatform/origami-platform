import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { StorageService } from '@shared/services/storage.service';
import { CourseService } from '@shared/services/course.service';
import { Lecture, Course } from '@core/models/course';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

@Component({
  selector: 'lecture-manager',
  templateUrl: './lecture-manager.component.html',
  styleUrls: ['./lecture-manager.component.scss']
})
export class LectureManagerComponent  {
  downloadURL: Observable<string>;

  constructor(
    public dialogRef: MatDialogRef<LectureManagerComponent>,
    private storageService: StorageService,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: Course) {
  }

  async onFileSet(file: File) {
    this.downloadURL = await this.storageService.uploadVideo(file);
  }

  async add(name = '', description = '') {
    if (!this.downloadURL) { return; }
    const videoUrl = await this.downloadURL.toPromise();
    const id = uuid();


    const lecture: Lecture = {id, name, description, videoUrl};

    const currentLectures = _.clone(this.data.lectures);
    const updatedLectures = _.concat(currentLectures, lecture);

    const copy = _.clone(this.data);
    copy.lectures = updatedLectures;
    // this.data.lectures = updatedLectures;
    this.courseService.update(copy);
  }

  close(): void {
    this.dialogRef.close();
  }
}
