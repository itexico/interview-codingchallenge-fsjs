import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { ListService } from './list.service';

@Injectable()
export class ItemService {
    public url: string;
    
    constructor(
        private _http: HttpClient,
        private _listService: ListService
    ){
        this.url = GLOBAL.url;
    }

    //POST /item/listId Adds a new item
    addItem(item, listId): Observable<any> {
        //Specifying CORS setup and params to be sent
        let params = JSON.stringify(item);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Cookies', this._listService.getCookies());

        return this._http.post(this.url+'item/'+listId, params, {headers: headers});
    }

    //PUT /item/listId/itemId Updates an existing item into a given list
    updateItem(item, listId, itemId): Observable<any> {
        let params = JSON.stringify(item);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Cookies', this._listService.getCookies());

        return this._http.put(this.url+'item/'+listId+'/'+itemId, params, {headers: headers});
    }

    //DELETE /listId/itemId Deletes a given item into a given list
    deleteItem(listId, itemId): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Cookies', this._listService.getCookies());

        return this._http.delete(this.url+'item/'+listId+'/'+itemId, {headers: headers});
    }
}