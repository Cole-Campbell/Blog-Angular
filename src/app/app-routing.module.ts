import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { BlogArticleComponent } from './components/blog-article/blog-article.component';
import { BlogSearchComponent } from './components/blog-search/blog-search.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'search-posts/:term', component: BlogSearchComponent },
  { path: 'post/:id/:blogSlug', component: BlogArticleComponent },
  { path: '**', component: BlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
