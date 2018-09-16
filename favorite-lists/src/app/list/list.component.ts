import { Component, OnInit } from '@angular/core';

import { ListService } from './list.service';
import { List } from './list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lists: List[] = [
    new List(1, 'Favorite food', 'Vegetable soup'),
    new List(2, 'Favorite movie', 'Mulan'),
    new List(3, 'Favorite place', 'Swiss Alps')
  ];

  constructor(
    private _listService: ListService
  ) { }

  ngOnInit() {
    //this.getLists();
  }

  getLists() {
    //this._listService.getLists()
    //.then(lists => this.lists = lists);
  }

  create(list: List) {
    this.lists.push(list);
  }

}
