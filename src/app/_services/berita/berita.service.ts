import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { ServerApiService } from './../server-api/server-api.service'


export class modelBerita {
  id       : Number;
  title    : string;
  likes    : string;
  tags     : string;
  imageNews: FileList;
  userId   : string;
  news     : string;
} 


@Injectable({
  providedIn: 'root'
})
export class BeritaService {
  public baseUrl:string
  public serviceURL = '/api/berita'

  constructor(
    private http: HttpClient,
    private serverApiService : ServerApiService,
    ){
      this.baseUrl = (this.serverApiService.getAPI()) + this.serviceURL;
    }

  postBerita(data: modelBerita){
    var request:modelBerita = data;
    var formData = new FormData();
    if(data.imageNews != null){
      Array.from(data.imageNews).forEach(f => formData.append('imageNews',f))
    }
    formData.append('title',request.title)
    formData.append('tags',request.tags)
    formData.append('userId',request.userId)
    formData.append('news',request.news)


    return this.http.post(this.baseUrl,formData);
  }

  
  updateBerita(data: modelBerita){
    var request:modelBerita = data;
    var formData = new FormData();
    if(data.imageNews != null){
      Array.from(data.imageNews).forEach(f => formData.append('imageNews',f))
    }
    formData.append('title',request.title)
    formData.append('tags',request.tags)
    formData.append('userId',request.userId)
    formData.append('news',request.news)
    return this.http.put(`${this.baseUrl}/${data.id}`, formData);
  }


  getAllBerita(){
    return this.http.get(this.baseUrl);
  }

  deleteBerita(id){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  downloadImageBerita(id): Observable<any> {
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





  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${this.baseUrl}?title=${title}`);
  }


}




