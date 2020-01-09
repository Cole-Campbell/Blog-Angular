import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BlogPostModel } from 'src/app/interfaces/blog-post-model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  searchTerm: string;
  results: BlogPostModel[];


  ngOnInit() {
    this.apiService.getPosts().subscribe(results => this.results = results);

  }

  navigateToSearch(searchTerm) {
  }

  search() {
    
  }

}
