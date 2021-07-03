import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { ServerApiService } from './../server-api/server-api.service'

export class WebInfoModels{
  websiteImage : FileList;
  address : string;
  mapLocation : string;
  websiteImageName : string;
  websiteName : string;
  id : number;
}

@Injectable({
  providedIn: 'root'
})
export class WebPreferencesService {
  public baseUrl:string
  public serviceURL = '/api/website-info'

  constructor(
    private http: HttpClient,
    private serverApiService : ServerApiService,
    ){
      this.baseUrl = (this.serverApiService.getAPI()) + this.serviceURL;
    }
  
  public getWebsiteInfo(){
    return this.http.get(this.baseUrl);

  }

  public getWebsiteImage(){
    return this.http.get(this.baseUrl+'/img/1',  { responseType: 'blob' })
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

  public updateWebsitePreferences(data: WebInfoModels){
    var request:WebInfoModels = data;
    var formData = new FormData();
    if(data.websiteImage != null){
      Array.from(data.websiteImage).forEach(f => formData.append('websiteImage',f))
    }
    formData.append('id', String(data.id))
    formData.append('address',data.address)
    formData.append('mapLocation',data.mapLocation)
    formData.append('websiteName',data.websiteName)
    return this.http.put(`${this.baseUrl}/${data.id}`, formData);
  }



}
