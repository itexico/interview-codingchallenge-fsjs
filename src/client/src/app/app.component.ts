import { MdDialog } from '@angular/material';
import { Component } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MdDialog) { }
  title = 'app';

  // tslint:disable-next-line:one-line
  openDialog() {
    this.dialog.open(DialogComponent, {
      height: '330px',
      width: '800px',
    });
  }
}
