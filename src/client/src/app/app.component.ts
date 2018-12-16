import { Component, OnInit } from '@angular/core';
import { List } from './models/list';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ListService]
})
export class AppComponent implements OnInit {
  public lists: List[];
  public newNote: List;
  public url: string;
  public status: string;
  public error: string;
  public modal: string;
  public modalNote: List;

  constructor(
    private _listService: ListService
  ){
    this.newNote = new List('','',[]);
    this.modal = 'off';
  }

  ngOnInit(){
    this._listService.setCookies();
    this.retrieveLists();
  }

  //Gets all the lists for the user
  retrieveLists(){
    this._listService.getLists().subscribe(
      response => {
        this.lists = response.data.lists;
      },
      error => {
        this.error = error;
      }
    );
  }

  //Adds a new note even if empty
  onSubmit(form){
    this._listService.addList(this.newNote).subscribe(
      response => {
        this.newNote = response.data.list;
        this.modalNote = this.newNote;
        this.modal = 'on';
      },
      error => {
        this.error = error;
      }
    );
  }

  //When clicking on a note, it's displayed
  displayNote(event){
    this.modalNote = event;
    this.modal = 'on';
  }

  //When clicking on exit, the modal is closed and the object goes empty
  closeModal($event){
    this.modalNote = null;
    this.modal = 'off';
  }

  //Retrieves the lists for the user
  refreshNotes(event){
    this.retrieveLists();
  }
}
