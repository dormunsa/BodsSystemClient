import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  userGuid: string;
  // define api end point
  endPoint: string = 'https://localhost:44399/api/';
   // define video api end point
  videoEndPoint: string = 'https://localhost:5000/';
  // define secrets to  api requests
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'ClientId' : 'fc7a0083-2025-4c4c-ab2f-bc2f8d98abdd',
    'ClientSecret' : '73ff1926-a841-4bba-b428-0dbb8fc31a3a'
  });

  constructor(protected http: HttpClient) { }
  // generic get method the variable 'entity' decide the controller of the api
  get(entity: string, params?: any): Observable<any> {
    return this.http.get(`${this.endPoint}${entity}`, { headers: this.headers, params });
  }
  // generic post method the variable 'entity' decide the controller of the api
  post(entity: string, obj: any, responseType?): Observable<any> {
    return this.http.post(`${this.endPoint}${entity}`, obj, { headers: this.headers,  responseType: "text" });
  }
  //login by credentials
  login(entity: string, obj: any, responseType?): Observable<any> {
    return this.http.post(`${this.endPoint}${entity}`, obj, { headers: this.headers });
  }
  //generic patch method the variable 'entity' decide the controller of the api
  patch(entity: string, obj: any): Observable<any> {
    return this.http.patch(`${this.endPoint}${entity}`, obj, { headers: this.headers , responseType: "text"});
  }
  //generic put method the variable 'entity' decide the controller of the api
  put(entity: string, obj: any): Observable<any> {
    return this.http.put(`${this.endPoint}${entity}`, obj, { headers: this.headers , responseType: "text"});
  }
  //start video operation
  startVideo(entity: string, params?: any): Observable<any> {
    return this.http.get(`${this.videoEndPoint}${entity}`, { headers: this.headers, params });
  }
  //generic delete method the variable 'entity' decide the controller of the api
  delete(entity: string, obj: any): Observable<any> {
    const options = {
      headers: this.headers,
      body: obj,
    };
    return this.http.delete(`${this.endPoint}${entity}`, options);
  }
  //set headers the UserGuid Value
  setHeaders(userGuid) {
    this.headers = this.headers.set('UserGuid', userGuid);
  }
  //check UserGuid Value in url param or localStorage or  sessionStorage
  checkForUserGuid(whereToSearch: string) {
    switch (whereToSearch) {
      case 'getParams':
        const urlString = window.location.href;
        const url = new URL(urlString);
        return url.searchParams.get('guid');
      case 'localStorage':
        return localStorage.getItem('UserGuid');
      case 'sessionStorage':
        return sessionStorage.getItem('UserGuid');
    }
  }
  //set UserGuid Value in url param and localStorage and sessionStorage
  setUserGuid(whereToSet: string) {
    switch (whereToSet) {
      case 'localStorage':
        localStorage.setItem('UserGuid', this.userGuid);
        break;
      case 'sessionStorage':
        sessionStorage.setItem('UserGuid', this.userGuid);
        break;
    }
  }
}
