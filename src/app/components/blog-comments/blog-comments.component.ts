import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from 'src/app/interfaces/comment-model';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss']
})
export class BlogCommentsComponent implements OnInit {
  @Input() comments: CommentModel[];
  @Input() subComments: CommentModel[];
  constructor() { }

  ngOnInit() {
  }

  getSubcomments(parentId) {
    return this.subComments.filter(comment => comment.parent_id === parentId);
  }

}
