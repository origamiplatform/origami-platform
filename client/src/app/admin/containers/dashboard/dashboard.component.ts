import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CourseManagerComponent } from '@admin/components/course-manager/course-manager.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CourseManagerComponent, {
      width: '100vw',
      height: '80vh',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }
}
