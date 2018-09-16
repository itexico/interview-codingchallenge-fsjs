import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { List } from './list';

import 'rxjs';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private _http:Http
  ) { }

  create(list: List){
    return this._http.post('/lists', list)
    .map(data => data.json()).toPromise()
  }

  delete(list: List){
    return this._http.delete('/lists/' + list._id)
    .map(data => data.json()).toPromise()
  }

  update(list: List){
    return this._http.put('/lists/' + list._id, list)
    .map(data => data.json()).toPromise()
  }

  getLists(){
    return this._http.get('/lists/')
    .map(data => data.json()).toPromise()
  }

  getList(list: List){
    return this._http.post('/lists/' + list._id, list)
    .map(data => data.json()).toPromise()
  }
}
