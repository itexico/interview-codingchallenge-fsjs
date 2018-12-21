import { Component, OnInit } from '@angular/core';
import { ListModel } from 'src/app/model/list.model';
import { RequestService } from 'src/app/services/request.service';
import { GLOBAL } from 'src/app/services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: Array<ListModel> = [];
  listSelected: ListModel;
  isLoading = false;

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.requestService.get(`${GLOBAL.LIST_URL}s`)
      .subscribe(res => {
        this.lists = res['lists'];
        this.isLoading = false;
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

  deleteList() {
    this.isLoading = true;
    this.requestService.delete(`${GLOBAL.LIST_URL}/${this.listSelected._id}`)
      .subscribe(res => {
        swal('List Deleted', 'That stuff was not too cool!', 'error',
          {
            closeOnClickOutside: false,
            closeOnEsc: false,
          }).then((value) => {
          this.load();
        });
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

}
