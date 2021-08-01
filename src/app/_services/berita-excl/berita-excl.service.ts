import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { ServerApiService } from './../server-api/server-api.service'


export class data {
  id       : Number;
  title    : string;
  likes    : string;
  groups     : string;
  imageNews: FileList;
  userId   : string;
  news     : string;
  slug     : string;
} 


@Injectable({
  providedIn: 'root'
})
export class BeritaExclService {
  public baseUrl:string
  public serviceURL = '/api/berita-excl'

  constructor(
    private http: HttpClient,
    private serverApiService : ServerApiService,
    ){
      this.baseUrl = (this.serverApiService.getAPI()) + this.serviceURL;
    }

  create(data: data){
    var request:data = data;
    var formData = new FormData();
    if(data.imageNews != null){
      Array.from(data.imageNews).forEach(f => formData.append('imageNews',f))
    }
    formData.append('title',request.title)
    formData.append('groups',request.groups)
    formData.append('userId',request.userId)
    formData.append('news',request.news)
    formData.append('slug',request.slug)


    return this.http.post(this.baseUrl,formData);
  }

  
  update(data: data){
    var request:data = data;
    var formData = new FormData();
    if(data.imageNews != null){
      Array.from(data.imageNews).forEach(f => formData.append('imageNews',f))
    }
    formData.append('title',request.title)
    formData.append('groups',request.groups)
    formData.append('userId',request.userId)
    formData.append('news',request.news)
    formData.append('slug',request.slug)
    return this.http.put(`${this.baseUrl}/${data.id}`, formData);
  }

  getBeritaBySlug(slug){
    return this.http.get(this.baseUrl + '/slug/' + slug);
  }

  getTop5(){
    return this.http.get(this.baseUrl + '/top-5/all');
  }

  getByGroupName(groupName){
    return this.http.get(this.baseUrl + '/groups/'+groupName);
  }
  
  getAll(){
    return this.http.get(this.baseUrl);
  }

  delete(id){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  getImgById(id): Observable<any> {
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




