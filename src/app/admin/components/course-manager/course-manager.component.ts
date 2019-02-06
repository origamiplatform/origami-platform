import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CourseService } from '@shared/services/course.service';
import { Course } from '@core/models/course';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';


@Component({
  selector: 'course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent {

  constructor(
    public dialog: MatDialog,
    public courseService: CourseService,
  ) {

  }

  openEditDialog(course: Course): void {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      width: '100vw',
      height: '95vh',
      data: course.id
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '100vw',
      height: '80vh',
    });
  }
}
