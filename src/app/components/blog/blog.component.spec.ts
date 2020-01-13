import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { BlogComponent } from "./blog.component";
import { BlogPostComponent } from "../blog-post/blog-post.component";
import { ApiService } from "../../services/api/api.service";
import { Meta } from "@angular/platform-browser";
import { of } from "rxjs/internal/observable/of";

describe("BlogComponent", () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [BlogComponent, BlogPostComponent],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onInit()", () => {
    it("should assign results to blogItems variable", inject(
      [ApiService, Meta],
      (apiService: ApiService, meta: Meta) => {
        expect(component.blogItems.length).toEqual(0);

        const result = [
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

        spyOn(apiService, "getPosts").and.returnValue(of(result));

        component.ngOnInit();

        fixture.detectChanges();

        expect(component.blogItems.length).toEqual(1);
      }
    ));
  });
});
