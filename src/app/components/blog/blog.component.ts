import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "../../services/api/api.service";
import { BlogPostModel } from "../../interfaces/blog-post-model";
import { takeUntil } from "rxjs/operators";

import { Meta } from "@angular/platform-browser";
import { Subject } from "rxjs";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"]
})
export class BlogComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  blogItems: BlogPostModel[] = [];
  metaData = [
    { name: "title", content: "LetsGetChecked - Blog" },
    {
      name: "description",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ];
  constructor(private apiService: ApiService, private meta: Meta) {}

  ngOnInit() {
    this.apiService
      .getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.blogItems = result;
      });
    this.meta.addTags(this.metaData);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
