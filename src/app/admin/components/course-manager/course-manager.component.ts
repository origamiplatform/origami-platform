import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Dialog } from '@classes/Dialog/class';

@Component({
  selector: 'course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent extends Dialog {

  constructor(
    private fb: FormBuilder,
    public dRef: MatDialogRef<CourseManagerComponent>,
  ) {
    super(fb, dRef);
  }
}
