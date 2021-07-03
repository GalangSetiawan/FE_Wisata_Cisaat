import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

export class objectAssign {
  bgImage : FileList;
  type : string;
  name : string;
} 

const baseUrl = 'http://localhost:8080/api/file';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

const headers = new HttpHeaders();
headers.append('Content-Type', 'multipart/form-data');
headers.append('Accept', 'application/json');


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadSingleFile(data:objectAssign): Observable<any> {
    console.log('uploadSingleFile ===>',data)
    var formData = new FormData();
    Array.from(data.bgImage).forEach(f => formData.append('file',f))
    formData.append('type',data.type)
    formData.append('name',data.name)
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
