import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BlogPostComponent } from "./components/blog-post/blog-post.component";
import { BlogComponent } from "./components/blog/blog.component";
import { BlogArticleComponent } from "./components/blog-article/blog-article.component";
import { BlogCommentsComponent } from "./components/blog-comments/blog-comments.component";
import { CommentComponent } from "./components/comment/comment.component";
import { HttpClientModule } from "@angular/common/http";
import { CommentFormComponent } from "./components/comment-form/comment-form.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { DataConversionPipe } from "./pipes/data-conversion/data-conversion.pipe";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { BlogSearchComponent } from "./components/blog-search/blog-search.component";

@NgModule({
  declarations: [
    AppComponent,
    BlogPostComponent,
    BlogComponent,
    BlogArticleComponent,
    BlogCommentsComponent,
    CommentComponent,
    CommentFormComponent,
    NavbarComponent,
    SearchBarComponent,
    DataConversionPipe,
    BlogSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
