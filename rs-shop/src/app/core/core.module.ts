import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { InfoBlockComponent } from './header/info-block/info-block.component';
import { LocationComponent } from './header/info-block/location/location.component';
import { ContactsComponent } from './header/info-block/contacts/contacts.component';
import { CoreDataService } from './services/core-data.service';
import { LocationPopUpComponent } from './location-pop-up/location-pop-up.component';
import { FormsModule } from '@angular/forms';
import { NavBlockComponent } from './header/nav-block/nav-block.component';
import { MenuComponent } from './main-page/menu/menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    InfoBlockComponent,
    LocationComponent,
    ContactsComponent,
    LocationPopUpComponent,
    NavBlockComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    LocationPopUpComponent,
  ],
  providers: [CoreDataService],
})
export class CoreModule { }
