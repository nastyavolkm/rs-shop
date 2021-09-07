import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpInterceptor } from './core/interceptors/http.interceptor';
import { GoodsModule } from './goods/goods.module';
import { CategoriesEffects } from './redux/effects/categoriesEffects';
import { GoodsEffects } from './redux/effects/goodsEffects';
import { categoriesReducer } from './redux/reducers/categoriesReducer';
import { goodsReducer } from './redux/reducers/goodsReducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    GoodsModule,
    HttpClientModule,
    StoreModule.forRoot({
      categories: categoriesReducer,
      goods: goodsReducer
  }),
  StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
  }),
  EffectsModule.forRoot([CategoriesEffects, GoodsEffects]),
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
