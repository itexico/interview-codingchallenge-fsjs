import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoList } from '../../app/interfaces/info-lists.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoListsService {

  info: InfoList ={};
  loaded = false;
  listas: any[] = []

  constructor( private http: HttpClient) {

    //Leer archivo JSON
    this.http.get('assets/data/data.json')
    .subscribe( (resp: any) =>{
      this.loaded = true;
      this.info = resp;
      this.listas = resp.Listas
      console.log(resp);
      console.log(this.listas)
      // resp["twitter"]
    })
   }
}
