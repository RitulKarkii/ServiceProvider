import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Features {
  apiUrl = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}

  registerUser(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`,data);
  }

  loginUser(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`,data);
  }

  getUserData():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/data`);
  }

  editUserData(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/edit/${id}`)
   }

   updateUserData(data:any, id:number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/update/ ${id}`,data,);
   }

   deleteUserData(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`)
   }
}

