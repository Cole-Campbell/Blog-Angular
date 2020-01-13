import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { BlogPostModel } from '../../interfaces/blog-post-model';

import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogItems: BlogPostModel[] = [];
  metaData = [
    {name: 'title', content: 'LetsGetChecked - Blog'},
    {name: 'description', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
  ];
  constructor(private apiService: ApiService,
              private meta: Meta) { }

  ngOnInit() {
    this.apiService.getPosts().subscribe(result => {
      this.blogItems = result;
    });
    this.meta.addTags(this.metaData);
  }
}
