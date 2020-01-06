import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BlogPostModel } from 'src/app/interfaces/blog-post-model';
import { CommentModel } from 'src/app/interfaces/comment-model';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent implements OnInit {
  private blogId: number;
  public blogPost: BlogPostModel;
  public blogComments: CommentModel[];

  constructor(private route: ActivatedRoute,
    private apiService: ApiService) {
    this.blogId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.apiService.getPost(this.blogId).subscribe(result => this.blogPost = result);

    this.apiService.getPostComments(this.blogId).subscribe(result => this.blogComments = result);
  }

  createComment(comment: CommentModel) {
    this.apiService.createPostComment(this.blogId, comment);
  }

  updateComment(comment: CommentModel) {
    this.apiService.updatePostComment(this.blogId, comment);
  }

}
