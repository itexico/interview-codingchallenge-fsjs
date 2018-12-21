import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemModel } from 'src/app/model/item.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemId: string;
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
      this.itemId = params['id'];
      this.loadItem();
    });
  }

  loadItem() {
    this.isLoading = true;
    this.requestService.get(`${GLOBAL.ITEM_URL}/${this.itemId}`)
      .subscribe(res => {
        this.item = res['item'];
        this.itemForm.controls.description.setValue(this.item.description);
        this.isLoading = false;
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

  editItem() {
    this.isLoading = true;
    this.requestService.update(`${GLOBAL.ITEM_URL}/${this.itemId}`,
      this.itemForm.value)
      .subscribe(res => {
        swal('Item Updated', 'Your favorite stuff was updated!', 'success',
          {
            closeOnClickOutside: false,
            closeOnEsc: false,
          }).then((value) => {
          this.itemForm.reset();
          this.router.navigate(['/items', this.item.list]);
        });
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

}
