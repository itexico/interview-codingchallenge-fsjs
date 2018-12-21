import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ListModel } from 'src/app/model/list.model';
import { RequestService } from 'src/app/services/request.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html'
})
export class NewListComponent implements OnInit {

  listForm: FormGroup;
  list: ListModel;
  isLoading = false;

  constructor(private router: Router,
    private requestService: RequestService) {
    this.listForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {
  }

  addList() {
    this.isLoading = true;
    this.requestService.post(`${GLOBAL.LIST_URL}`,
      this.listForm.value)
      .subscribe(res => {
        swal('List Added', 'More favorite stuff!', 'success',
          {
            closeOnClickOutside: false,
            closeOnEsc: false,
          }).then((value) => {
          this.listForm.reset();
          this.router.navigate(['/lists']);
        });
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

}
