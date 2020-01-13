import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostComponent } from './blog-post.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    component.postData = {
      "id": 7,
      "title": "Blog post Test",
      "author": "John",
      "publish_date": "2016-09-29",
      "slug": "blog-post-test",
      "description": "Mocking",
      "content": "Mock Content"
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
