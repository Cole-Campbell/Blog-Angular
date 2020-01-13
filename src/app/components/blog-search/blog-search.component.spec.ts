import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { BlogSearchComponent } from "./blog-search.component";
import { BlogPostComponent } from "../blog-post/blog-post.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ApiService } from "../../services/api/api.service";
import { of } from "rxjs";

describe("BlogSearchComponent", () => {
  let component: BlogSearchComponent;
  let fixture: ComponentFixture<BlogSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [BlogSearchComponent, BlogPostComponent],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("search()", () => {
    it("should assign results to posts variable", inject(
      [ApiService],
      (apiService: ApiService) => {
        expect(component.posts).toEqual([]);
        const result = [
          {
            id: 7,
            title: "Blog post Test",
            author: "John",
            publish_date: "2016-09-29",
            slug: "blog-post-test",
            description: "Mocking",
            content: "Mock Content"
          },
          {
            id: 7,
            title: "Blog post Test",
            author: "John",
            publish_date: "2016-09-29",
            slug: "blog-post-test",
            description: "Mocking",
            content: "Mock Content"
          }
        ];
        spyOn(apiService, "searchPosts").and.returnValue(of(result));
        component.ngOnInit();
        expect(component.posts.length).toEqual(2);
        expect(component.posts).toEqual(result);
      }
    ));
  });
});
