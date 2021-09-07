import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { GoodComponent } from './good/good.component';
import { GoodsRoutingModule } from './goods.routing-module';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';



@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    GoodComponent,
    CatalogPageComponent
  ],
  imports: [
    CommonModule,
    GoodsRoutingModule,
  ],
  exports: [
    CategoryComponent,
    SubCategoryComponent,
    GoodComponent,
  ],
})
export class GoodsModule { }
