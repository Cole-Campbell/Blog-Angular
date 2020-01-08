import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../interfaces/comment-model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { BlogPostModel } from '../interfaces/blog-post-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: String = 'http://localhost:9001';
  constructor(private http: HttpClient) { }

  public getPosts(): Observable<BlogPostModel[]> {
    return this.http.get<BlogPostModel[]>(`${this.baseUrl}/posts`)
    .pipe(map(posts => posts.sort((a, b) => a > b ? 1 : -1 )));
  }

  public getPost(postId: Number): Observable<BlogPostModel> {
    return this.http.get<BlogPostModel>(`${this.baseUrl}/posts/${postId}`);
  }

  public getPostComments(postId: Number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.baseUrl}/posts/${postId}/comments`)
    .pipe(map(comments => comments.sort((a, b) => a > b ? 1 : -1 )));
  }

  public createPostComment(postId: Number, comment: CommentModel) {
    this.http.post(`${this.baseUrl}/posts/${postId}/comments`, comment);
  }

  public updatePostComment(postId: Number, comment: CommentModel) {
    this.http.post(`${this.baseUrl}/posts/${postId}/comments`, comment);
  }
}
