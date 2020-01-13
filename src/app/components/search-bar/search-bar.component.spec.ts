import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { SearchBarComponent } from "./search-bar.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

describe("SearchBarComponent", () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      declarations: [SearchBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("searchBlog()", () => {
    it("should not call navigate or formControl reset if term is not defined", inject(
      [Router],
      (router: Router) => {
        spyOn(router, "navigate");
        spyOn(component.searchForm.controls["term"], "reset");
        component.searchBlog();
        expect(router.navigate).not.toHaveBeenCalled();
        expect(
          component.searchForm.controls["term"].reset
        ).not.toHaveBeenCalled();
      }
    ));

    it("should call navigate and formControl reset if term is not defined", inject(
      [Router],
      (router: Router) => {
        spyOn(router, "navigate");
        spyOn(component.searchForm.controls["term"], "reset");
        component.searchForm.controls["term"].setValue("Test");
        component.searchBlog();
        expect(router.navigate).toHaveBeenCalledWith([
          "/search-posts",
          component.searchForm.controls["term"].value
        ]);
        expect(
          component.searchForm.controls["term"].reset
        ).toHaveBeenCalledTimes(1);
      }
    ));
  });
});
