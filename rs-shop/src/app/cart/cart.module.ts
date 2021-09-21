import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartRoutingModule } from './cart.routing-module';
import { CartComponent } from './cart/cart.component';
import { FavoriteComponent } from './cart/favorite/favorite.component';
import { FavoriteGoodComponent } from './favorite-good/favorite-good.component';

@NgModule({
  declarations: [CartComponent, FavoriteComponent, FavoriteGoodComponent],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
