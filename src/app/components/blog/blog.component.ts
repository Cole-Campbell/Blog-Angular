import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BlogPostModel } from 'src/app/interfaces/blog-post-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogItems: BlogPostModel[] = [];
  constructor(private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.apiService.getPosts().subscribe(result => {
      this.blogItems = result.sort((a, b) => {
        return a.publishDate > b.publishDate ? 1 : -1;
      });
    });
  }
}
