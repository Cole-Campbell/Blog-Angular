import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { CommentFormComponent } from "./comment-form.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DatePipe, CommonModule } from "@angular/common";

describe("CommentFormComponent", () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        CommonModule
      ],
      declarations: [CommentFormComponent],
      providers: [DatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    component.formContent = {
      id: 6,
      postId: 2,
      parent_id: null,
      user: "Test",
      date: "2016-03-16",
      content: "Test Comment"
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onInit()", () => {
    it("should set form controls if content is provided and isUpdateComment true", () => {
      expect(component.commentForm.controls["user"].value).toEqual("");
      expect(component.commentForm.controls["comment"].value).toEqual("");
      component.isUpdateComment = true;
      component.ngOnInit();
      expect(component.commentForm.controls["user"].value).toEqual(
        component.formContent.user
      );
      expect(component.commentForm.controls["comment"].value).toEqual(
        component.formContent.content
      );
    });
  });

  describe("close()", () => {
    it("should call emit function", () => {
      spyOn(component.closeForm, "emit");
      component.close();
      expect(component.closeForm.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe("pushComment()", () => {
    it("should call emit on updateComment with create comment object", inject(
      [DatePipe],
      (datePipe: DatePipe) => {
        const expectedResult = {
          comment: {
            content: "Mock Comment",
            user: "Mock",
            date: datePipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss"),
            parent_id: null,
            postId: null
          },
          commentType: "CREATE"
        };
        component.commentForm.controls["user"].setValue("Mock");
        component.commentForm.controls["comment"].setValue("Mock Comment");
        component.formContent = null;
        spyOn(component.updateComment, "emit");
        component.onSubmit();
        expect(component.updateComment.emit).toHaveBeenCalledTimes(1);
        expect(component.updateComment.emit).toHaveBeenCalledWith(
          expectedResult
        );
      }
    ));

    it("should call emit on updateComment with create reply object", inject(
      [DatePipe],
      (datePipe: DatePipe) => {
        const expectedResult = {
          comment: {
            content: "Mock Comment",
            user: "Mock",
            date: datePipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss"),
            parent_id: component.formContent.id,
            postId: null
          },
          commentType: "CREATE"
        };
        component.commentForm.controls["user"].setValue("Mock");
        component.commentForm.controls["comment"].setValue("Mock Comment");
        spyOn(component.updateComment, "emit");
        component.onSubmit();
        expect(component.updateComment.emit).toHaveBeenCalledTimes(1);
        expect(component.updateComment.emit).toHaveBeenCalledWith(
          expectedResult
        );
      }
    ));

    it("should call emit on updateComment with update comment object", inject(
      [DatePipe],
      (datePipe: DatePipe) => {
        const expectedResult = {
          comment: {
            id: component.formContent.id,
            postId: component.formContent.postId,
            parent_id: null,
            user: "Mock",
            date: component.formContent.date,
            content: "Mock Comment"
          },
          commentType: "UPDATE"
        };
        component.commentForm.controls["user"].setValue("Mock");
        component.commentForm.controls["comment"].setValue("Mock Comment");
        component.isUpdateComment = true;
        spyOn(component.updateComment, "emit");
        component.onSubmit();
        expect(component.updateComment.emit).toHaveBeenCalledTimes(1);
        expect(component.updateComment.emit).toHaveBeenCalledWith(
          expectedResult
        );
      }
    ));
  });
});
