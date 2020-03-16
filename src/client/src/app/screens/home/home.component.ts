import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from '../../models/list.model';
import { ApiService } from 'src/app/services/api.service';
import { EditModalComponent } from 'src/app/components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean>;
  lists$: BehaviorSubject<List[]>;

  @ViewChild(EditModalComponent) modal: EditModalComponent;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.isLoading$ = this.api.isLoading$;
    this.lists$ = this.api.lists$;
  }

  showModal(list: List): void {
    this.modal.showModal(list);
  }

  onSave(input: HTMLInputElement): void {
    const list = {
      name: input.value
    };
    this.api.createList(list).subscribe(() => {
      input.value = '';
      this.api.loadLists();
    });
  }

  onUpdate(list: List): void {
    this.api.updateList(list).subscribe(() => {
      this.api.loadLists();
    });
  }

  onDelete(id: string): void {
    this.api.deleteList(id).subscribe(() => {
      this.api.loadLists();
    });
  }
}
