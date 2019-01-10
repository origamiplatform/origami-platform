import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'file-upload-button',
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss']
})
export class FileUploadButtonComponent {
  @Output() fileSet = new EventEmitter<File>();
  @Output() fileReset = new EventEmitter<boolean>();
  @ViewChild('fileUploader') fileUploader: ElementRef;

  file: File;

  reset(): void {
    this.file = null;
    this.fileUploader.nativeElement.value = null;
    this.fileReset.emit(true);
  }
  setFile(files: FileList) {
    const file = files[files.length - 1];
    this.file = file;
    this.fileSet.emit(file);
  }
  openFileUploder() {
    this.fileUploader.nativeElement.click();
  }
}
