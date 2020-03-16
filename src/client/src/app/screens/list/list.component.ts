import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from 'src/app/models/list.model';
import { EditModalComponent } from 'src/app/components/edit-modal/edit-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/models/item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean>;
  list$: BehaviorSubject<List>;
  id: string;

  @ViewChild(EditModalComponent) modal: EditModalComponent;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading$ = this.api.isLoading$;
    this.list$ = this.api.list$;

    this.route.params.subscribe(params => {
      this.id = params.id;
      this.api.loadList(this.id);
    });
  }

  showModal(item: Item): void {
    this.modal.showModal(item);
  }

  onSave(input: HTMLInputElement): void {
    const item = {
      name: input.value,
      list: this.id
    };
    this.api.createItem(item).subscribe(() => {
      input.value = '';
      this.api.loadList(this.id);
    });
  }

  onUpdate(item: Item): void {
    this.api.updateItem(item).subscribe(() => {
      this.api.loadList(this.id);
    });
  }

  onDelete(id: string): void {
    this.api.deleteItem(id).subscribe(() => {
      this.api.loadList(this.id);
    });
  }
}
