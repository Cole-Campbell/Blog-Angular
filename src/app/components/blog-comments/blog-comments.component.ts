import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CommentModel } from 'src/app/interfaces/comment-model';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCommentsComponent implements OnInit {
  @Input() comments: CommentModel[];
  @Output() commentUpdate = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  updateComment(updateObject: any) {
    this.commentUpdate.emit(updateObject);
  }

}
