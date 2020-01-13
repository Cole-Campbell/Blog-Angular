import { Component, Input } from "@angular/core";
import { BlogPostModel } from "../../interfaces/blog-post-model";

@Component({
  selector: "app-blog-post",
  templateUrl: "./blog-post.component.html",
  styleUrls: ["./blog-post.component.scss"]
})
export class BlogPostComponent {
  @Input() postData: BlogPostModel;

  constructor() {}
}
