import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { BlogArticleComponent } from "./blog-article.component";
import { BlogCommentsComponent } from "../blog-comments/blog-comments.component";
import { CommentFormComponent } from "../comment-form/comment-form.component";
import { CommentComponent } from "../comment/comment.component";
import { DataConversionPipe } from "../../pipes/data-conversion/data-conversion.pipe";
import { CommentService } from "../../services/comment/comment.service";
import { ApiService } from "../../services/api/api.service";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs/internal/observable/of";

describe("BlogArticleComponent", () => {
  let component: BlogArticleComponent;
  let fixture: ComponentFixture<BlogArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [
        BlogArticleComponent,
        BlogCommentsComponent,
        CommentFormComponent,
        CommentComponent,
        DataConversionPipe
      ],
      providers: [
        CommentService,
        ApiService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1
              }
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onInit()", () => {
    const result = {
      id: 10,
      title: "Blog post #10",
      author: "Tandy Thiem",
      publish_date: "2016-11-29",
      slug: "blog-post-10",
      description: "Mock Desc",
      content: "Mock Content"
    };

    it("should call apiService and assign result to blogPost", inject(
      [ApiService, CommentService],
      (apiService: ApiService, commentService: CommentService) => {
        expect(component.blogPost).toBeUndefined();
        spyOn(apiService, "getPost").and.returnValue(of(result));
        spyOn(commentService, "loadComments");
        component.ngOnInit();
        expect(component.blogPost).toEqual(result);
        expect(commentService.loadComments).toHaveBeenCalled();
      }
    ));
  });

  describe("createComment()", () => {
    const comment = {
      id: 6,
      postId: 2,
      parent_id: null,
      user: "Hermina",
      date: "2016-03-16",
      content: "Mock"
    };

    const expected = {
      id: 6,
      postId: 1,
      parent_id: null,
      user: "Hermina",
      date: "2016-03-16",
      content: "Mock"
    };
    it("should assign postId and call createComment", inject(
      [CommentService],
      (commentService: CommentService) => {
        spyOn(commentService, "createComment");
        component.updateComment({ comment: comment, commentType: "CREATE" });
        expect(commentService.createComment).toHaveBeenCalledWith(expected);
      }
    ));
  });

  describe("editComment()", () => {
    const comment = {
      id: 6,
      postId: 2,
      parent_id: null,
      user: "Hermina",
      date: "2016-03-16",
      content: "Mock"
    };
    it("should assign postId and call createComment", inject(
      [CommentService],
      (commentService: CommentService) => {
        spyOn(commentService, "updateComment");
        component.updateComment({ comment: comment, commentType: "UPDATE" });
        expect(commentService.updateComment).toHaveBeenCalledWith(comment);
      }
    ));
  });
});
