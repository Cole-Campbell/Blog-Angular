import { TestBed, inject } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiService } from '../api/api.service';
import { of } from 'rxjs/internal/observable/of';
import { CommentModel } from '../../interfaces/comment-model';

describe('CommentService', () => {
  const comment: CommentModel[] = [{
    "id": 6,
    "postId": 2,
    "parent_id": null,
    "user": "Hermina",
    "date": "2016-03-16",
    "content": "Mock Content"
  }];
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpClientTestingModule,
      HttpHandler,
      HttpClient]
  }));

  it('should be created', () => {
    const service: CommentService = TestBed.get(CommentService);
    expect(service).toBeTruthy();
  });

  describe('createComment()', () => {
    it('should call createPostComment and loadComments', inject([ApiService], (apiService: ApiService) => {
      let service = new CommentService(apiService);
      spyOn(apiService, 'createPostComment').and.returnValue(of(comment));
      spyOn(service, 'loadComments');
      service.createComment(comment[0]);
      expect(apiService.createPostComment).toHaveBeenCalledWith(comment[0].postId, comment[0]);
      expect(service.loadComments).toHaveBeenCalled();
    }));
  });

  describe('updateComments()', () => {
    it('should call updatePostComment', inject([ApiService], (apiService: ApiService) => {
      let service = new CommentService(apiService);
      spyOn(apiService, 'updatePostComment').and.returnValue(of(comment));
      spyOn(service, 'loadComments');
      service.updateComment(comment[0]);
      expect(apiService.updatePostComment).toHaveBeenCalledWith(comment[0]);
      expect(service.loadComments).toHaveBeenCalled();
    }));
  });

  describe('deleteComment()', () => {
    it('should call deleteComment', inject([ApiService], (apiService: ApiService) => {
      let service = new CommentService(apiService);
      spyOn(apiService, 'deletePostComment').and.returnValue(of(comment[0]));
      spyOn(service, 'loadComments');
      service.deleteComment(comment[0]);
      expect(apiService.deletePostComment).toHaveBeenCalledWith(comment[0].id);
      expect(service.loadComments).toHaveBeenCalled();
    }));
  });
});
