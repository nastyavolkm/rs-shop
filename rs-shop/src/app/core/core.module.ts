import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing-module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './header/info-block/contacts/contacts.component';
import { InfoBlockComponent } from './header/info-block/info-block.component';
import { LocationComponent } from './header/info-block/location/location.component';
import { MenuComponent } from './header/menu/menu.component';
import { LoginInfoComponent } from './header/nav-block/login-info/login-info.component';
import { NavBlockComponent } from './header/nav-block/nav-block.component';
import { SearchResultsBlockComponent } from './header/nav-block/search-results-block/search-results-block.component';
import { NavCategoriesBlockComponent } from './header/nav-categories-block/nav-categories-block.component';
import { LocationPopUpComponent } from './location-pop-up/location-pop-up.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationComponent } from './login-form/registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';
import { Page404Component } from './page404/page404.component';
import { AuthService } from './services/auth.service';
import { CoreDataService } from './services/core-data.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InfoBlockComponent,
    LocationComponent,
    ContactsComponent,
    LocationPopUpComponent,
    NavBlockComponent,
    MenuComponent,
    SearchResultsBlockComponent,
    NavCategoriesBlockComponent,
    MainPageComponent,
    Page404Component,
    LoginFormComponent,
    LoginInfoComponent,
    RegistrationComponent,
  ],
  imports: [CommonModule, FormsModule, CoreRoutingModule, SharedModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LocationPopUpComponent,
    MainPageComponent,
    Page404Component,
  ],
  providers: [CoreDataService, AuthService],
})
export class CoreModule {}
