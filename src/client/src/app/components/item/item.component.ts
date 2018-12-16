import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
    selector: 'Item',
    templateUrl: './Item.component.html',
    providers: [ItemService]
})
export class ItemComponent {
    @Input('listId') listId: string;
    @Input('Item') item: Item;
    @Output() refreshItems = new EventEmitter;
    public content: string;
    public status: string;
    public error: string;

    constructor(
        private _itemService: ItemService
    ){}

    //When updating an item, a event emitter is fired to the list component to refresh its items
    onUpdate(){
       this._itemService.updateItem({content: this.item.content}, this.listId, this.item._id).subscribe(
           response => {
               this.refreshItems.emit();
           },
           error => {
               console.log(error);
           }
       );

       this.status = 'saved';
    }

    //When deleting an item, a event emitter is fired to the list component to refresh its items
    onDelete(){
        this._itemService.deleteItem(this.listId, this.item._id).subscribe(
            response => {
                this.refreshItems.emit();
            },
            error => {
                console.log(error);
            }
        );
    }

    //Makes visible 'saving' button when an item is being focused.
    onFocus(){
        this.status = 'focus';
    }
}