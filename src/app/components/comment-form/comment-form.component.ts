import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit() {
    //this.apiService.createPostComment()
  }

}
