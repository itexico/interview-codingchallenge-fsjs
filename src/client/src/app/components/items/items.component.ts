import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/model/item.model';
import { RequestService } from 'src/app/services/request.service';
import { GLOBAL } from 'src/app/services/global';
import swal from 'sweetalert';
import { ListModel } from 'src/app/model/list.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  list: ListModel;
  listId: string;
  items: Array<ItemModel> = [];
  itemSelected: ItemModel;
  isLoading = false;

  constructor(private requestService: RequestService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.listId = params['listId'];
      this.loadData();
    });
  }

  loadData() {
    this.loadList();
  }

  loadList() {
    this.isLoading = true;
    this.requestService.get(`${GLOBAL.LIST_URL}/${this.listId}`)
      .subscribe(res => {
        this.list = res['list'];
        this.loadItems();
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

  loadItems() {
    this.isLoading = true;
    this.requestService.get(`${GLOBAL.ITEM_URL}s/${this.listId}`)
      .subscribe(res => {
        this.items = res['items'];
        this.isLoading = false;
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

  deleteItem() {
    this.isLoading = true;
    this.requestService.delete(`${GLOBAL.ITEM_URL}/${this.itemSelected._id}`)
      .subscribe(res => {
        swal('Item Deleted', 'That stuff was not too cool!', 'error',
          {
            closeOnClickOutside: false,
            closeOnEsc: false,
          }).then((value) => {
          this.loadItems();
        });
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }
}
