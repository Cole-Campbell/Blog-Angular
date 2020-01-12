import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from '../../interfaces/comment-model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentModel;
  @Input() subcomments?: CommentModel[]; 

  isFormVisible: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleCommentForm() {
    this.isFormVisible = !this.isFormVisible;
  }

}
