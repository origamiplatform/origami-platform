import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CourseService } from '@shared/services/course.service';
import { Course } from '@core/models/course';

import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { LectureDialogComponent } from '../lecture-dialog/lecture-dialog.component';

@Component({
  selector: 'course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public courseService: CourseService,
  ) {

  }

  ngOnInit() {

  }

  openLectureDialog(course: Course): void {
    const dialogRef = this.dialog.open(LectureDialogComponent, {
      width: '100vw',
      height: '80vh',
      data: course
    });
  }

  openCourseDialog(): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '100vw',
      height: '80vh',
    });
  }
}
