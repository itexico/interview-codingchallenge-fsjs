import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { List } from '../models/list.model';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLoading$ = new BehaviorSubject(false);
  lists$ = new BehaviorSubject([]);
  list$ = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {}

  loadLists(): void {
    this.isLoading$.next(true);

    this.http
      .get(environment.apiUrl + 'list')
      .pipe(
        map(response => {
          this.isLoading$.next(false);
          this.lists$.next(response as List[]);
          return response as List[];
        }),
        catchError((error, caught) => {
          console.log('Error', error);
          return of(error);
        })
      )
      .subscribe(() => {});
  }

  loadList(id: string): void {
    this.isLoading$.next(true);

    this.http
      .get(`${environment.apiUrl}list/${id}`)
      .pipe(
        map(response => {
          this.isLoading$.next(false);
          this.list$.next(response as List[]);
          return response as List[];
        }),
        catchError((error, caught) => {
          console.log('Error', error);
          if (error.status === 404) {
            this.router.navigate(['/404']);
          }
          return of(error);
        })
      )
      .subscribe(() => {});
  }

  createList(list: List): Observable<List> {
    this.isLoading$.next(true);
    return this.http.post(environment.apiUrl + 'list', { ...list }).pipe(
      map(response => {
        this.isLoading$.next(false);
        return response as List;
      })
    );
  }

  updateList(list: List): Observable<List> {
    this.isLoading$.next(true);
    return this.http
      .put(`${environment.apiUrl}list/${list._id}`, { ...list })
      .pipe(
        map(response => {
          this.isLoading$.next(false);
          return response as List;
        })
      );
  }

  deleteList(id: string): Observable<any> {
    this.isLoading$.next(true);
    return this.http.delete(`${environment.apiUrl}list/${id}`).pipe(
      map(response => {
        this.isLoading$.next(false);
        return response;
      })
    );
  }

  createItem(item: Item): Observable<Item> {
    this.isLoading$.next(true);
    return this.http.post(environment.apiUrl + 'item', { ...item }).pipe(
      map(response => {
        this.isLoading$.next(false);
        return response as Item;
      })
    );
  }

  updateItem(item: Item): Observable<Item> {
    this.isLoading$.next(true);
    return this.http
      .put(`${environment.apiUrl}item/${item._id}`, { ...item })
      .pipe(
        map(response => {
          this.isLoading$.next(false);
          return response as Item;
        })
      );
  }

  deleteItem(id: string): Observable<any> {
    this.isLoading$.next(true);
    return this.http.delete(`${environment.apiUrl}item/${id}`).pipe(
      map(response => {
        this.isLoading$.next(false);
        return response;
      })
    );
  }
}
