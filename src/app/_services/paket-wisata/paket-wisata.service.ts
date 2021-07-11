import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { ServerApiService } from './../server-api/server-api.service'


export class modelData {
  id            : number;
  price         : string;
  title         : string;
  description   : string;
  time          : string;
  userId        : string;
  paketWisataImg: string;
}


@Injectable({
  providedIn: 'root'
})
export class PaketWisataService {
  public baseUrl:string
  public serviceURL = '/api/paket-wisata'

  constructor(
    private http: HttpClient,
    private serverApiService : ServerApiService,
    ){
      this.baseUrl = (this.serverApiService.getAPI()) + this.serviceURL;
    }

    public create(data:modelData): Observable<any> {
      var request:modelData = data;
      var formData = new FormData();
      if(data.paketWisataImg != null){
        Array.from(data.paketWisataImg).forEach(f => formData.append('paketWisataImg',f))
      }
      formData.append('title',request.title)
      formData.append('price',request.price)
      formData.append('userId',request.userId)
      formData.append('description',request.description)
      formData.append('time',request.time)
      return this.http.post(this.baseUrl,formData);
    }
  
    public update(data:modelData): Observable<any> {
      var request:modelData = data;
      var formData = new FormData();
      if(data.paketWisataImg != null){
        Array.from(data.paketWisataImg).forEach(f => formData.append('paketWisataImg',f))
      }
      formData.append('title',request.title)
      formData.append('price',request.price)
      formData.append('userId',request.userId)
      formData.append('description',request.description)
      formData.append('time',request.time)
      return this.http.put(`${this.baseUrl}/${data.id}`, formData);
    }

    public getAll(){
      return this.http.get(this.baseUrl);
    }

    public getById(id){
      return this.http.get(this.baseUrl + '/' +id);
    }

    public delete(id): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }

    public getImgById(id): Observable<any> {
      return this.http.get(this.baseUrl+'/img/'+id,  { responseType: 'blob' })
      .pipe(
        switchMap(response => this.readFile(response))
      );
    }
  
    private readFile(blob: Blob): Observable<string> {
      return Observable.create(obs => {
        const reader = new FileReader();
        reader.onerror = err => obs.error(err);
        reader.onabort = err => obs.error(err);
        reader.onload = () => obs.next(reader.result);
        reader.onloadend = () => obs.complete();
        return reader.readAsDataURL(blob);
      });
    }


}
