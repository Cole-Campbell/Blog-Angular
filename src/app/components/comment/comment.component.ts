import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentModel } from '../../interfaces/comment-model';
import { CommentService } from '../../services/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentModel;
  @Output() commentUpdate = new EventEmitter();

  isFormVisible: boolean = false;
  isUpdateVisible: boolean = false;
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  toggleCommentForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  toggleUpdateForm() {
    this.isUpdateVisible = !this.isUpdateVisible;
  }

  provideContent() {
    return this.isUpdateVisible ? this.comment : null;
  }

  updateComment(updateObject: any) {
    this.commentUpdate.emit(updateObject);
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment)
  }

  close() {
    this.isFormVisible = false;
    this.isUpdateVisible = false;
  }

}
