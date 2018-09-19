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

  constructor( private route: ActivatedRoute,
              public infoList:InfoListsService) { }

  ngOnInit() {

    this.route.params
    .subscribe(params =>{
      console.log(params['id'])
      this.infoList.getItemList()
        
      
    });
  }

}
