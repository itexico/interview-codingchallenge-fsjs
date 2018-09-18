import { Component } from '@angular/core';
import { InfoListsService } from '../assets/services/info-lists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor ( public _infoListsService: InfoListsService){

  }
}
