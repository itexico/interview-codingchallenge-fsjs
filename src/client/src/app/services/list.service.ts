import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { List } from '../models/list';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ListService {
    public url: string;
    
    constructor(
        private _http: HttpClient,
        private _cs: CookieService
    ){
        this.url = GLOBAL.url;
    }
    
    setCookies(){
        this._cs.set('auth', 'auth');
    }

    getCookies(){
        return this._cs.get('auth');
    }

    // GET /lists/ 
    getLists(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Cookies', this.getCookies());

        return this._http.get(this.url + 'lists', {headers: headers});
    }

    //Gets a list by a given ID
    getList(listId): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Cookies', this.getCookies());

        return this._http.get(this.url + 'list/' + listId, {headers: headers});
    }

    //Adds a list object into the server
    addList(list: List): Observable<any> {
        //Specifying CORS setup and params to be sent
        let params = JSON.stringify(list);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Cookies', this.getCookies());

        return this._http.post(this.url + 'list', params, {headers: headers});
    }

    //PUT /list/listId Updates a list by a given ID
    updateList(list, listId): Observable<any> {
        //Specifying CORS setup and params to be sent
        let params = JSON.stringify(list);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Cookies', this.getCookies());

        return this._http.put(this.url + 'list/' + listId, params, {headers: headers});
    }

    //DELETE /list/listId Deletes a list by a given ID
    deleteList(listId): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Cookies', this.getCookies());

        return this._http.delete(this.url+'list/'+listId, {headers: headers});
    }
}