import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';

import { AppRouting } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListsComponent } from './components/lists/lists.component';
import { NewListComponent } from './components/lists/new-list/new-list.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EditListComponent } from './components/lists/edit-list/edit-list.component';
import { ItemsComponent } from './components/items/items.component';
import { NewItemComponent } from './components/items/new-item/new-item.component';
import { EditItemComponent } from './components/items/edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListsComponent,
    NewListComponent,
    LoaderComponent,
    EditListComponent,
    ItemsComponent,
    NewItemComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    BrowserAnimationsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
