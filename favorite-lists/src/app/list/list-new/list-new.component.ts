import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from '../list';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.css']
})
export class ListNewComponent implements OnInit {
  @Output() createNewListEvent = new EventEmitter();
  newList = new List;

  constructor() { }

  ngOnInit() {
  }

  create(){
    this.createNewListEvent.emit(this.newList);
    this.newList = new List();
  }
}
