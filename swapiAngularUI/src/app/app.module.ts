import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
 import { HomeComponent } from './home/home.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { HttpClientModule } from '@angular/common/http';
import { InputDistanceComponent } from './input-distance/input-distance.component';
import { StapshipListComponent } from './stapship-list/stapship-list.component';
import { StarShipsService } from './services/starships.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    InputDistanceComponent,
     HomeComponent,
     StapshipListComponent
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [StarShipsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
