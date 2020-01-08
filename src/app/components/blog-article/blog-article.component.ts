import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BlogPostModel } from 'src/app/interfaces/blog-post-model';
import { CommentModel } from 'src/app/interfaces/comment-model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent implements OnInit {
  private blogId: number;
  public blogPost: BlogPostModel;
  public blogComments: CommentModel[];
  public blogSubcomments: CommentModel[];

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private meta: Meta,
              private title: Title) {
    this.blogId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.apiService.getPost(this.blogId).subscribe(result => {
      this.blogPost = result;
      this.setMetaData(result);
    });

    this.apiService.getPostComments(this.blogId).subscribe(result => {
      this.blogComments = result.filter(comment => comment.parent_id === null);
      this.blogSubcomments = result.filter(comment => comment.parent_id !== null);
    });
  }

  setMetaData(data: BlogPostModel) {
    const metaData = [
      {name: 'title', content: data.title},
      {name: 'description', content: data.description},
      {name: 'author', content: data.author}
    ]

    metaData.map(data => this.meta.addTag(data));
    this.title.setTitle(data.title);
  }

  createComment(comment: CommentModel) {
    this.apiService.createPostComment(this.blogId, comment);
  }

  updateComment(comment: CommentModel) {
    this.apiService.updatePostComment(this.blogId, comment);
  }

}
