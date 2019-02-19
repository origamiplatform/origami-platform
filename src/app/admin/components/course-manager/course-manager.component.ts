import { AuthService } from '@shared/services/auth.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CourseService } from '@shared/services/course.service';
import { Course } from '@core/models/course';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import { User } from '@core/models/user';


@Component({
  selector: 'course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent {
  user: User;
  constructor(
    public dialog: MatDialog,
    public courseService: CourseService,
    public auth: AuthService
  ) {
    this.auth.user$.subscribe(data => this.user = data);
  }

  openEditDialog(course: Course): void {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      width: '100vw',
      height: '95vh',
      data: { courseId: course.id, user: this.user }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '100vw',
      height: '80vh',
      data: this.user
    });
  }
}
