import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommentModel } from "../../interfaces/comment-model";
import { Observable } from "rxjs/internal/Observable";
import { BlogPostModel } from "../../interfaces/blog-post-model";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private baseUrl: String = "http://localhost:9001";
  constructor(private http: HttpClient) {}

  public getPosts(): Observable<BlogPostModel[]> {
    return this.http.get<BlogPostModel[]>(
      `${this.baseUrl}/posts?_sort=publish_date&_order=desc`
    );
  }

  public getPost(postId: number): Observable<BlogPostModel> {
    return this.http.get<BlogPostModel>(`${this.baseUrl}/posts/${postId}`);
  }

  public searchPosts(searchTerm: string): Observable<BlogPostModel[]> {
    return this.http.get<BlogPostModel[]>(
      `${this.baseUrl}/posts?q=${searchTerm}&_sort=publish_date&_order=desc`
    );
  }

  public getPostComments(postId: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(
      `${this.baseUrl}/posts/${postId}/comments?_sort=date&_order=desc`
    );
  }

  public createPostComment(
    postId: number,
    comment: CommentModel
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/${postId}/comments`, comment);
  }

  public updatePostComment(comment: CommentModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/comments/${comment.id}`, comment);
  }

  public deletePostComment(commentId): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/${commentId}`);
  }
}
