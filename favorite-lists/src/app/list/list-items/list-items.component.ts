import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../list'

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  @Input() lists;
  @Output() destroyListEvent = new EventEmitter();
  @Output() updateListEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  add(){
    
  }

  destroy(list: List){
    this.destroyListEvent.emit(list);
  }

  update(lists) {
    this.updateListEvent.emit(lists);
  }
}
