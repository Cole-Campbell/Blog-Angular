import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "../../services/api/api.service";
import { ActivatedRoute } from "@angular/router";
import { BlogPostModel } from "../../interfaces/blog-post-model";
import { Meta } from "@angular/platform-browser";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-blog-search",
  templateUrl: "./blog-search.component.html",
  styleUrls: ["./blog-search.component.scss"]
})
export class BlogSearchComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  searchTerm: string;
  posts: BlogPostModel[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.meta.addTag({ name: "robots", content: "NOINDEX" });
    this.searchTerm = this.route.snapshot.params.term;
    this.route.params.subscribe(result => {
      this.searchTerm = result.term;
      this.search();
    });
  }

  private search() {
    this.apiService
      .searchPosts(this.searchTerm)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => (this.posts = result));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
