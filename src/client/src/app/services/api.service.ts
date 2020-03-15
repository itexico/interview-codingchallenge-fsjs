import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { List } from '../screens/models/list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLoading$ = new BehaviorSubject(false);
  lists$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  loadLists(): Observable<List[]> {
    this.isLoading$.next(true);
    return this.http.get(environment.apiUrl + 'list').pipe(
      map(response => {
        this.isLoading$.next(false);
        this.lists$.next(response as List[]);
        return response as List[];
      })
    );
  }
}
