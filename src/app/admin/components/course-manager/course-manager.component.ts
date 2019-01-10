import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

import { Dialog } from '@classes/Dialog/class';
import { StorageService } from '@shared/services/storage.service';


@Component({
  selector: 'course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent extends Dialog {
  downloadURL: Observable<string>;

  constructor(
    private fb: FormBuilder,
    public dRef: MatDialogRef<CourseManagerComponent>,
    private storageService: StorageService
  ) {
    super(fb, dRef);
  }

  async onFileSet(file: File) {
    this.downloadURL = await this.storageService.uploadVideo(file);
  }
}
