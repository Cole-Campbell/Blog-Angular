import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentModel } from '../../interfaces/comment-model';
import { CommentService } from '../../services/comment/comment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  @Input() formContent: CommentModel;
  @Input() isUpdateComment: boolean = false;
  @Input() canCloseForm: boolean = true;
  @Output() updateComment = new EventEmitter();
  @Output() closeForm = new EventEmitter();

  constructor(private commentService: CommentService,
              private fb: FormBuilder,
              private datePipe: DatePipe) {
    this.commentForm = this.fb.group({
      user: ['', [Validators.required, Validators.maxLength(100)]],
      comment: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnInit() {
    if(this.isUpdateComment && this.formContent) {
      this.commentForm.controls['user'].setValue(this.formContent.user);
      this.commentForm.controls['comment'].setValue(this.formContent.content);
    }
  }

  onSubmit() {
    this.pushComment();
  }

  close() {
    this.closeForm.emit();
  }

  private prepareNewComment() {
    const parentId = this.formContent ? this.formContent.id : null;

    const newComment: CommentModel = {
      content: this.commentForm.controls['comment'].value,
      user: this.commentForm.controls['user'].value,
      date: this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      parent_id: parentId,
      postId: null
    }

    return newComment;
  }

  private prepareUpdatedComment() {
    const updatedComment = JSON.parse(JSON.stringify(this.formContent));
    
    updatedComment.content = this.commentForm.controls['comment'].value;
    updatedComment.user = this.commentForm.controls['user'].value;

    return updatedComment;
  }

  private pushComment() {
    let comment;
    if (!this.formContent) {
      comment = this.prepareNewComment()
      this.updateComment.emit({comment: comment, commentType: 'CREATE'});
    } else if(this.formContent && !this.isUpdateComment) {
      comment = this.prepareNewComment();
      this.updateComment.emit({comment: comment, commentType: 'CREATE'})
    } else {
      comment = this.prepareUpdatedComment();
      this.updateComment.emit({comment: comment, commentType: 'UPDATE'})
    }

    this.commentForm.reset();
  }

}
