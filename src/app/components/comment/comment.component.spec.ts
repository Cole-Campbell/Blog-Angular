import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentService } from '../../services/comment/comment.service';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ 
        CommentComponent,
        CommentFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = {
      "id": 7,
      "postId": 2,
      "parent_id": null,
      "user": "Natashia",
      "date": "2016-03-17",
      "content": "Nunc facilisis nisi vitae dapibus sodales. Proin vitae nunc turpis."
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleCommentForm()', () => {
    it('should toggle isFormVisible variable', () => {
      expect(component.isFormVisible).toBeFalsy();
      component.toggleCommentForm();
      expect(component.isFormVisible).toBeTruthy();
    });
  });

  describe('toggleUpdateForm()', () => {
    it('should toggle isUpdateVisible variable', () => {
      expect(component.isUpdateVisible).toBeFalsy();
      component.toggleUpdateForm();
      expect(component.isUpdateVisible).toBeTruthy();
    });
  });

  describe('provideContent()', () => {
    it('should return comment if isUpdateVisible is true', () => {
      component.isUpdateVisible = true;
      const result = component.provideContent();
      expect(result).toEqual(component.comment);
    });

    it('should return null if isUpdateVisible is false', () => {
      const result = component.provideContent();
      expect(result).toBeNull();
    });
  });

  describe('updateComment()', () => {
    it('should call emit with object', () => {
      const obj = {test: 'mock'};
      spyOn(component.commentUpdate, 'emit');
      component.updateComment(obj);
      expect(component.commentUpdate.emit).toHaveBeenCalledTimes(1);
      expect(component.commentUpdate.emit).toHaveBeenCalledWith(obj);
    });
  });

  describe('deleteComment()', () => {
    it('should call commentService function delete comment with comment object',
    inject([CommentService], (commentService: CommentService) => {
      spyOn(commentService, 'deleteComment');
      component.deleteComment();
      expect(commentService.deleteComment).toHaveBeenCalledTimes(1);
      expect(commentService.deleteComment).toHaveBeenCalledWith(component.comment);
    }));
  });

  describe('close()', () => {
    it('should set form variables to false', () => {
      component.isUpdateVisible = true;
      component.isFormVisible = true;
      expect(component.isUpdateVisible).toBeTruthy();
      expect(component.isFormVisible).toBeTruthy();
      component.close();
      expect(component.isUpdateVisible).toBeFalsy();
      expect(component.isFormVisible).toBeFalsy();
    });
  });
});
