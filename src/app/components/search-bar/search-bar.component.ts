import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      term: ["", Validators.required]
    });
  }

  ngOnInit() {}

  searchBlog() {
    const term = this.searchForm.controls["term"].value;
    if (term) {
      this.router.navigate(["/search-posts", term]);
      this.searchForm.controls["term"].reset();
    }
  }
}
