import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { DetailedGoodComponent } from './detailed-good/detailed-good.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [
  {
    path: ':id',
    component: CategoryComponent,
    data: {
      title: 'page1',
      breadcrumb: [
        {
          label: 'Page1',
          url: '',
        },
      ],
    },
  },
  {
    path: ':id/:id',
    component: SubCategoryComponent,
    data: {
      title: 'page2',
      breadcrumb: [
        {
          label: '{{id}}', // pageOneID Parameter value will be add
          url: '/:id',
        },
        {
          label: 'page {{id}}', // pageTwoID Parameter value will be add
          url: '',
        },
      ],
    },
  },
  {
    path: ':id/:id/:id',
    component: DetailedGoodComponent,
    data: {
      title: 'page3',
      breadcrumb: [
        {
          label: 'page1',
          url: '/page1/:id',
        },
        {
          label: '{{dynamicText}} page', // If "dynamicText" is not parameter , should be set value  using NgMatBreadcrumbService, More info please check the 5th point.
          url: 'page1/:pageOneID/page2/:pageTwoID',
        },
        {
          label: '{{customText}}', // If "customText" is not parameter , should be set value  using NgMatBreadcrumbService, More info please check the 5th point.
          url: '',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsRoutingModule {}
