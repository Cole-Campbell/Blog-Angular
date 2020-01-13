import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from '../../interfaces/comment-model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _comments = new BehaviorSubject<CommentModel[]>([]);
  readonly postComments = this._comments.asObservable();


  constructor(private apiService: ApiService) { }

  get comments() {
    return this._comments.asObservable();
  }

  loadComments(postId: number) {
    this.apiService.getPostComments(postId).subscribe(results => {
      this._comments.next(results)
    });
  }

  createComment(comment: CommentModel) {
    this.apiService.createPostComment(comment.postId, comment).subscribe(
      res => this.loadComments(res.postId),
      err => console.error('Error', err)
    );
  }

  updateComment(comment: CommentModel) {
    this.apiService.updatePostComment(comment).subscribe(
      res => {this.loadComments(res.postId)},
      err => console.error('Error', err)
    );
  }

  deleteComment(comment: CommentModel) {
    this.apiService.deletePostComment(comment.id).subscribe(
      res => {this.loadComments(comment.postId)},
      err => console.error('Error', err)
    );
  }
}
