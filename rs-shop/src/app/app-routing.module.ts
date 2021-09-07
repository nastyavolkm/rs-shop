import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './core/main-page/main-page.component';
import { Page404Component } from './core/page404/page404.component';
import { CategoryComponent } from './goods/category/category.component';

const routes: Routes = [
  {
      path: '',
      component: MainPageComponent,
  },
  {
      path: ':id',
      component: CategoryComponent,
  },
  {
      path: '**',
      component: Page404Component,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
