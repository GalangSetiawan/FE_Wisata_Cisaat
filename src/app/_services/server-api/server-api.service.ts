import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  public API = 'http://localhost:8080'

  constructor() { }

  public getAPI(){
    return this.API
  }

  

}
