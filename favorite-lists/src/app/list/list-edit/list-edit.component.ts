import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../list';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  @Input() list: List; 
  editList: List = new List;
  @Output() updateListEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
    Object.assign(this.editList, this.list);
  }

  update() {
    this.editList.editable = false;
    this.updateListEvent.emit({
      original: this.list,
      edited: this.editList
  });
  }
}
