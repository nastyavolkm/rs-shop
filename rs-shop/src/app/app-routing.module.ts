import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './core/main-page/main-page.component';
import { Page404Component } from './core/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: { breadcrumb: 'Главная' },
  },
  {
    path: 'categories',
    loadChildren: () => import('./goods/goods.module').then((m) => m.GoodsModule),
  },
  {
    path: '**',
    component: Page404Component,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
