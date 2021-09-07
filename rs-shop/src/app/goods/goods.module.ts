import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { GoodsRoutingModule } from './goods.routing-module';



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    GoodsRoutingModule,
  ],
  exports: [
    CategoryComponent,
  ],
})
export class GoodsModule { }
