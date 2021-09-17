import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { CategoryComponent } from './category/category.component';
import { DetailedGoodComponent } from './detailed-good/detailed-good.component';
import { ColorizeAmountDirective } from './directives/colorize-amount.directive';
import { GoodComponent } from './good/good.component';
import { GoodsRoutingModule } from './goods.routing-module';
import { SortByPipe } from './pipes/sort-by.pipe';
import { GoodsService } from './services/goods.service';
import { SubCategoryComponent } from './sub-category/sub-category.component';



@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    GoodComponent,
    CatalogPageComponent,
    DetailedGoodComponent,
    ColorizeAmountDirective,
    SortByPipe
  ],
  imports: [
    CommonModule,
    GoodsRoutingModule,
    NgxPaginationModule,
  ],
  exports: [
    CategoryComponent,
    SubCategoryComponent,
    GoodComponent,
  ],
  providers: [
    GoodsService,
  ],
})
export class GoodsModule { }
