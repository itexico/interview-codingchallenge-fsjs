import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { ItemsComponent } from './screens/items/items.component';
import { ListsComponent } from './screens/lists/lists.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HomeComponent } from './screens/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ItemsComponent,
    ListsComponent,
    SpinnerComponent,
    HomeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
