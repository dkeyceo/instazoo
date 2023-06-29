import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const COMMENT_API = 'http://localhost:8080/api/comment/'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  addCommentToPost(postId: number, message: string): Observable<any>{
    return this.httpClient.post(COMMENT_API + postId + '/create', {
      message: message
    });
  }

  getCommentsToPost(postId: number): Observable<any> {
    return this.httpClient.get(COMMENT_API + postId + '/all');
  }

  delete(commentId: number): Observable<any> {
    return this.httpClient.post(COMMENT_API + commentId + '/delete', null);
  }

}
