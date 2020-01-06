import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from 'src/app/interfaces/comment-model';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss']
})
export class BlogCommentsComponent implements OnInit {
  @Input() comments: CommentModel[];
  constructor() { }

  ngOnInit() {
    if (this.comments) {
    this.comments = this.sortComments();
    }
  }

  private sortComments() {
    return this.comments.sort((a, b) => {return a.date > b.date ? 1 : -1});
  }

}
