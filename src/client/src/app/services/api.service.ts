import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { List } from '../models/list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLoading$ = new BehaviorSubject(false);
  lists$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

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

  deleteList(id): Observable<any> {
    this.isLoading$.next(true);
    return this.http.delete(`${environment.apiUrl}list/${id}`).pipe(
      map(response => {
        this.isLoading$.next(false);
        return response;
      })
    );
  }
}
