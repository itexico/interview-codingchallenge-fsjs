import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from '../models/list.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean>;
  lists$: BehaviorSubject<List[]>;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.isLoading$ = this.api.isLoading$;
    this.lists$ = this.api.lists$;
  }
}
