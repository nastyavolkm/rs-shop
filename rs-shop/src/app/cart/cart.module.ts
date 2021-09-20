import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartRoutingModule } from './cart.routing-module';
import { CartComponent } from './cart/cart.component';
import { FavoriteComponent } from './cart/favorite/favorite.component';

@NgModule({
  declarations: [CartComponent, FavoriteComponent],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
