import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {MdToolbarModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';
import {MdDialogModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdListModule} from '@angular/material';








@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
