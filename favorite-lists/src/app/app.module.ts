import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

import { ListService } from './list/list.service';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListNewComponent } from './list/list-new/list-new.component';
import { ListItemsComponent } from './list/list-items/list-items.component';
import { ListEditComponent } from './list/list-edit/list-edit.component';
import { ListDetailsComponent } from './list/list-details/list-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListNewComponent,
    ListItemsComponent,
    ListEditComponent,
    ListDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    ListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
