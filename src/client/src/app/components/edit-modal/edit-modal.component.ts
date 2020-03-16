import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/item.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Output() update = new EventEmitter();

  @ViewChild('content') content;
  @ViewChild('editNameInput') input;

  name: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  showModal(data: List | Item): void {
    this.name = data.name;
    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        () => this.update.next({ ...data, name: this.name }),
        () => {}
      );
  }
}
