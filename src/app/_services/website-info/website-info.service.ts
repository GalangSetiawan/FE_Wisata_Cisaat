import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';


const baseUrl = 'http://localhost:8080/api/file';

export class WebInfoModels{
  websiteImage : FileList;
  address : string;
  mapLocation : string;
  websiteName : string;
  id : number;
}


const headers = new HttpHeaders();
headers.append('Content-Type', 'multipart/form-data');
headers.append('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class WebsiteInfoService {

  constructor(private http: HttpClient) { }


  saveWebInfo(data:WebInfoModels){
    var formData = new FormData();
    Array.from(data.websiteImage).forEach(f => formData.append('websiteImage',f))
    formData.append('address',data.address)
    formData.append('mapLocation',data.mapLocation)
    formData.append('websiteName',data.websiteName)
    return this.http.post<any>(baseUrl+'/upload', formData , {headers});
  }


  downloadImage(id): Observable<any> {
    return this.http.get(baseUrl+'/'+id,  { responseType: 'blob' })
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
