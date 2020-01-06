import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from 'src/app/interfaces/comment-model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentModel;
  constructor() { }

  ngOnInit() {
  }

}
