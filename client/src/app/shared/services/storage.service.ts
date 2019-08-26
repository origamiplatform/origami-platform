import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { CommonActionService } from './common-action.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private storage: AngularFireStorage,
    private actions: CommonActionService
  ) { }

  uploadVideo(file: File): Promise<any> {
    const path = `videos/${file.name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    task.percentageChanges().subscribe(n => this.actions.updateLoading(n));

    return new Promise((resolve, reject) => {
      task.snapshotChanges().pipe(
        finalize(async () => {
          this.actions.endLoading();
          const downloadURL = await ref.getDownloadURL();
          return resolve(downloadURL);
        })
      ).subscribe();
    });
  }
  downloadVideo(filePath: string): AngularFireStorageReference {
    return this.storage.ref(filePath);
  }
}
