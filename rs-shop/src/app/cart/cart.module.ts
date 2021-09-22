import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart.routing-module';
import { CartGoodComponent } from './cart/cart-good/cart-good.component';
import { CartComponent } from './cart/cart.component';
import { FavoriteComponent } from './cart/favorite/favorite.component';
import { FavoriteGoodComponent } from './favorite-good/favorite-good.component';

@NgModule({
  declarations: [CartComponent, FavoriteComponent, FavoriteGoodComponent, CartGoodComponent],
  imports: [CommonModule, FormsModule, CartRoutingModule],
})
export class CartModule {}
