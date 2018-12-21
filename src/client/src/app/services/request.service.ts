import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './global';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) {
  }

  get(path: string, params?: any) {
    const url = `${GLOBAL.BASE_URL}/${path}`;

    return this.httpClient.get(url, params);
  }

  post(path: string, formData, headers?: HttpHeaders) {
    const url = `${GLOBAL.BASE_URL}/${path}`;

    return this.httpClient.post(url, formData, {headers});
  }

  update(path: string, formData) {
    const url = `${GLOBAL.BASE_URL}/${path}`;

    return this.httpClient.put(url, formData);
  }

  delete(path: string) {
    const url = `${GLOBAL.BASE_URL}/${path}`;

    return this.httpClient.delete(url);
  }

}
