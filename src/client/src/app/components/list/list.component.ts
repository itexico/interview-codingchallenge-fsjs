import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { ListService } from '../../services/list.service';

@Component({
    selector: 'List',
    templateUrl: './List.component.html',
    providers: [
        ItemService,
        ListService
    ]
})
export class ListComponent implements OnInit {
    @Input('list') list: List;
    @Output() closeModal = new EventEmitter;
    @Output() refreshNotes = new EventEmitter;
    public listTitle: string;
    public newItem: Item;
    public status: string;
    public error: string;

    constructor(
        private _itemService: ItemService,
        private _listService: ListService
    ){
        this.newItem = new Item('','');
    }

    ngOnInit(){
        this.listTitle = this.list.title;
    }

    //When clicking on closing saves the title of the list if there are changes
    onSave(){
        if(this.listTitle != this.list.title){
            this.updateTitle();
        }
        
        this.refreshNotes.emit();
        this.exitModal();
    }

    //Used for adding a new item into the list
    onSaveItem(){
        this._itemService.addItem(this.newItem, this.list._id).subscribe(
            response =>{
                this.list.items.push(response.data.item);
                this.refreshNotes.emit();
            },
            error => {
                console.log(error);
            }
        );
    }

    //Used for updating the title if it has changes
    onUpdate(){
        if(this.listTitle != this.list.title){
            this.updateTitle();
        }
        this.exitModal();
    }

    //Used for deleting the list from the database if requested by the user
    onDelete(){
        this._listService.deleteList(this.list._id).subscribe(
            response => {
                this.refreshNotes.emit();
                this.exitModal();
            },
            error => {
                console.log(error);
            }
        );
    }

    //Updates title of the list into the database
    updateTitle(){
        this._listService.updateList({title: this.listTitle}, this.list._id).subscribe(
            response => {
                this.list.title = response.data.list.title;
            },
            error => {
                console.log(error);
            }
        );
    }

    //Event emitter which refreshes changes into the root component for refreshin notes
    refreshItems(){
        this._listService.getList(this.list._id).subscribe(
            response => {
                this.list = response.data.list;
            },
            error => {
            }
        );

        this.refreshNotes.emit();
    }

    exitModal(){
        this.closeModal.emit('off');
    }
}