import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { CoreModule } from './core/core.module';
import { HttpInterceptor } from './core/interceptors/http.interceptor';
import { GoodsModule } from './goods/goods.module';
import { CategoriesEffects } from './redux/effects/categoriesEffects';
import { GoodsEffects } from './redux/effects/goodsEffects';
import { UserEffects } from './redux/effects/userEffects';
import { categoriesReducer } from './redux/reducers/categoriesReducer';
import { goodsReducer } from './redux/reducers/goodsReducer';
import { userReducer } from './redux/reducers/userReducer';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    GoodsModule,
    CartModule,
    CarouselModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({
      categories: categoriesReducer,
      goods: goodsReducer,
      user: userReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot([CategoriesEffects, GoodsEffects, UserEffects]),
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
