import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { CategoryComponent } from './category/category.component';
import { DetailedGoodComponent } from './detailed-good/detailed-good.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [
    {   path: '',
        component: CatalogPageComponent,
        data: { breadcrumb: {alias: 'Главная'}},
        children: [
            {
                path: ':id',
                component: CategoryComponent,
                data: { breadcrumb: {alias: 'Category'}},
                children: [
                    {
                        path: ':id',
                        component: SubCategoryComponent,
                        data: { breadcrumb: {alias: 'SubCategory'}},
                        children: [
                            {
                                path: ':id',
                                component: DetailedGoodComponent,
                                data: { breadcrumb: {alias: 'Good'}}
                            }
            ],
          }
        ],
      }
    ],
},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GoodsRoutingModule {}
