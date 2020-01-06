import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogPostModel } from 'src/app/interfaces/blog-post-model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent {

  @Input() postData: BlogPostModel;

  constructor() { }

}
