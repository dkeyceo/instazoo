import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const IMAGE_API = 'http://localhost:8080/api/image/'

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private httpClient: HttpClient) { }

  uploadImageToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.httpClient.post(IMAGE_API +'upload', uploadData);
  }

  uploadImageToPost(file: File, postId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.httpClient.post(IMAGE_API +postId+'/upload', uploadData);
  }

  getProfileImage(): Observable<any> {
    return this.httpClient.get(IMAGE_API +'profileImage');
  }

  getImageToPost(postId: number): Observable<any> {
    return this.httpClient.get(IMAGE_API +postId+ '/image');
  }
}
