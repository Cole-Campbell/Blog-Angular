import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../interfaces/comment-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: String = 'http://localhost:9001';
  constructor(private http: HttpClient) { }

  public getPosts() {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  public getPost(postId: Number) {
    return this.http.get(`${this.baseUrl}/posts/${postId}`);
  }

  public getPostComments(postId: Number) {
    return this.http.get(`${this.baseUrl}/posts/${postId}/comments`);
  }

  public createPostComment(postId: Number, comment: CommentModel) {
    return this.http.post(`${this.baseUrl}/posts/${postId}/comments`, comment);
  }

  public updatePostComment(postId: Number, comment: CommentModel) {
    return this.http.post(`${this.baseUrl}/posts/${postId}/comments`, comment);
  }
}
