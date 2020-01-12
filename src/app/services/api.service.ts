import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../interfaces/comment-model';
import { Observable } from 'rxjs/internal/Observable';
import { map, filter } from 'rxjs/operators';
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

  public getPost(postId: string): Observable<BlogPostModel> {
    return this.http.get<BlogPostModel>(`${this.baseUrl}/posts/${postId}`);
  }

  // Would typically pass a search term and perform filtering on backend.
  // public searchPosts(searchTerm: string): Observable<BlogPostModel[]> {
  //   return this.http.get<BlogPostModel[]>(`${this.baseUrl}/posts`)
  //   .pipe(every(results => results.filter(post => post.content.includes(searchTerm))));
  // }

  public getPostComments(postId: string): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.baseUrl}/posts/${postId}/comments`)
    .pipe(map(comments => comments.sort((a, b) => a > b ? 1 : -1 )));
  }

  public createPostComment(postId: string, comment: CommentModel) {
    this.http.post(`${this.baseUrl}/posts/${postId}/comments`, comment);
  }

  public updatePostComment(postId: string, comment: CommentModel) {
    this.http.post(`${this.baseUrl}/posts/${postId}/comments`, comment);
  }
}
