import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BlogCommentsComponent } from "./blog-comments.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { BlogPostComponent } from "../blog-post/blog-post.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { CommentComponent } from "../comment/comment.component";
import { DataConversionPipe } from "../../pipes/data-conversion/data-conversion.pipe";
import { CommentFormComponent } from "../comment-form/comment-form.component";

describe("BlogCommentsComponent", () => {
  let component: BlogCommentsComponent;
  let fixture: ComponentFixture<BlogCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        BlogCommentsComponent,
        NavbarComponent,
        BlogPostComponent,
        CommentComponent,
        SearchBarComponent,
        CommentFormComponent,
        DataConversionPipe
      ],
      providers: [HttpClient]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCommentsComponent);
    component = fixture.componentInstance;
    component.comments = [
      {
        id: 6,
        postId: 2,
        parent_id: null,
        user: "Hermina",
        date: "2016-03-16",
        content:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada "
      },
      {
        id: 7,
        postId: 2,
        parent_id: null,
        user: "Natashia",
        date: "2016-03-17",
        content:
          "Nunc facilisis nisi vitae dapibus sodales. Proin vitae nunc turpis."
      }
    ];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("updateComment()", () => {
    it("should call emit from EventEmitter", () => {
      const obj = { test: "Comment" };
      spyOn(component.commentUpdate, "emit");
      component.updateComment(obj);
      expect(component.commentUpdate.emit).toHaveBeenCalledWith(obj);
      expect(component.commentUpdate.emit).toHaveBeenCalledTimes(1);
    });
  });
});
