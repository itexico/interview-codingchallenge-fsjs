import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { GLOBAL } from 'src/app/services/global';
import { ItemModel } from 'src/app/model/item.model';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  listId: string;
  itemForm: FormGroup;
  item: ItemModel;
  isLoading = false;

  constructor(private router: Router,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute) {
    this.itemForm = new FormGroup({
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.listId = params['listId'];
    });
  }

  addItem() {
    this.isLoading = true;
    this.requestService.post(`${GLOBAL.ITEM_URL}/${this.listId}`,
      this.itemForm.value)
      .subscribe(res => {
        swal('Item Added', 'More favorite stuff!', 'success',
          {
            closeOnClickOutside: false,
            closeOnEsc: false,
          }).then((value) => {
          this.itemForm.reset();
          this.router.navigate(['/items', this.listId]);
        });
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }


}
