import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { InfoList, Lista } from '../../interfaces/info-lists.interface';
import { InfoListsService } from '../../../assets/services/info-lists.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  tittle: any;
  constructor( private route: ActivatedRoute,
              public infoList:InfoListsService) { }

  ngOnInit() {
    this.route.params
    .subscribe(params =>{
      this.tittle = params['id']
      console.log(params['id']) 
    });
  }

}
