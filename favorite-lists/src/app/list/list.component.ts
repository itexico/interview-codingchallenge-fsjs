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
    new List(1, 'Favorite food', 'Vegetable soup')
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

  destroy(list: List) {
    const removeList = this.lists.indexOf(list);
    this.lists.splice(removeList, 1);
  }

  update(lists) {
    const editList = this.lists.indexOf(lists.original);
    this.lists[editList] = lists.edited;
  }

}
