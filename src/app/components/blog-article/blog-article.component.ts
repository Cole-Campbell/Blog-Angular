import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api/api.service";
import { BlogPostModel } from "../../interfaces/blog-post-model";
import { CommentModel } from "../../interfaces/comment-model";
import { Meta, Title } from "@angular/platform-browser";
import { CommentService } from "../../services/comment/comment.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-blog-article",
  templateUrl: "./blog-article.component.html",
  styleUrls: ["./blog-article.component.scss"]
})
export class BlogArticleComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  private blogId: number;
  public blogPost: BlogPostModel;
  public blogComments: CommentModel[];
  public blogSubcomments: CommentModel[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private commentService: CommentService,
    private meta: Meta,
    private title: Title
  ) {
    this.blogId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.commentService.comments
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => (this.blogComments = result));
    this.apiService
      .getPost(this.blogId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.blogPost = result;
        this.setMetaData(result);
      });

    this.commentService.loadComments(this.blogId);
  }

  updateComment(comment) {
    switch (comment.commentType) {
      case "CREATE": {
        this.createComment(comment.comment);
        break;
      }
      case "UPDATE": {
        this.editComment(comment.comment);
      }
    }
  }

  private createComment(comment: CommentModel) {
    comment.postId = this.blogId;
    this.commentService.createComment(comment);
  }

  private editComment(comment: CommentModel) {
    this.commentService.updateComment(comment);
  }

  private setMetaData(data: BlogPostModel) {
    const metaData = [
      { name: "title", content: data.title },
      { name: "description", content: data.description },
      { name: "author", content: data.author }
    ];

    this.meta.addTags(metaData);
    this.title.setTitle(data.title);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
