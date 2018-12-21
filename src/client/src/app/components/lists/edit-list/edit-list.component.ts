import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListModel } from 'src/app/model/list.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  listForm: FormGroup;
  list: ListModel;
  listId: string;
  isLoading = false;

  constructor(private router: Router,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute) {
      this.listForm = new FormGroup({
        name: new FormControl('', Validators.required),
      });
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.listId = params['id'];
      this.loadList();
    });
  }

  loadList() {
    this.isLoading = true;
    this.requestService.get(`${GLOBAL.LIST_URL}/${this.listId}`)
      .subscribe(res => {
        this.list = res['list'];
        this.listForm.controls.name.setValue(this.list[0].name);
        this.isLoading = false;
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

  editList() {
    this.isLoading = true;
    this.requestService.update(`${GLOBAL.LIST_URL}/${this.listId}`,
      this.listForm.value)
      .subscribe(res => {
        swal('List Updated', 'Your favorite stuff was updated!', 'success',
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
