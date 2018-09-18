import { Component, OnInit } from '@angular/core';
import { InfoListsService } from '../../../assets/services/info-lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  // Injectar el servicio para poderlo utilizar
  constructor(public infoService: InfoListsService) {
   }

  ngOnInit() {
  }

}
