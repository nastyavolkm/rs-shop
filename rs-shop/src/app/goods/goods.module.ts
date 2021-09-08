import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { GoodComponent } from './good/good.component';
import { GoodsRoutingModule } from './goods.routing-module';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { DetailedGoodComponent } from './detailed-good/detailed-good.component';
import { ColorizeAmountDirective } from './directives/colorize-amount.directive';



@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    GoodComponent,
    CatalogPageComponent,
    DetailedGoodComponent,
    ColorizeAmountDirective
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
