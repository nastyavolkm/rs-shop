import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart.routing-module';
import { CartGoodComponent } from './cart/cart-good/cart-good.component';
import { CartComponent } from './cart/cart.component';
import { FavoriteComponent } from './cart/favorite/favorite.component';
import { OrderComponent } from './cart/order/order.component';
import { FavoriteGoodComponent } from './favorite-good/favorite-good.component';

@NgModule({
  declarations: [
    CartComponent,
    FavoriteComponent,
    FavoriteGoodComponent,
    CartGoodComponent,
    OrderComponent,
  ],
  imports: [CommonModule, FormsModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
