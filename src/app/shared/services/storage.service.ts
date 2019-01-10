import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: AngularFireStorage) { }

  uploadVideo(file: File): AngularFireUploadTask {
    const path = `videos/${file.name}`;
    return this.storage.upload(path, file);
  }
  downloadVideo(filePath: string): AngularFireStorageReference {
    return this.storage.ref(filePath);
  }
}
