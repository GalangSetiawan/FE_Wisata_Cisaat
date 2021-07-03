import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { ServerApiService } from './../server-api/server-api.service'


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public baseUrl:string
  public serviceURL = '/api/kontak'

  constructor(
    private http: HttpClient,
    private serverApiService : ServerApiService,
    ){
      this.baseUrl = (this.serverApiService.getAPI()) + this.serviceURL;
    }

    public getAllContact(){
      return this.http.get(this.baseUrl);
    }

    public getContactById(id){
      return this.http.get(this.baseUrl + '/' +id);
    }

    public createContact(data): Observable<any> {
      return this.http.post(this.baseUrl, data);
    }
  
    public updateContact(id, data): Observable<any> {
      return this.http.put(`${this.baseUrl}/${id}`, data);
    }
  
    public deleteContact(id): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }


}
