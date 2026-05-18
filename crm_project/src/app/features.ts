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
loginUser(data: any): Observable<any> {
  return this.http.post<any>( `${this.apiUrl}/login`,data,
   { withCredentials:true}
  );
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
    return this.http.delete<any>(`${this.apiUrl}/deleteUser/${id}`)
  }

  //  service

  addService(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/service`,data);
  }
  getServiceData():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getService`);
  }
  editServiceData(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/editService/${id}`);
  }
  updateServiceData(id:number, data:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/updateService/${id}`,data);
  }

  deleteServiceData(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteService/${id}`);
  }

  // Booking Service
  bookingUserData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/booking`,data,);
  }

  checkUser(){
  return this.http.get('http://127.0.0.1:8000/api/user',);
}

  cartData(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/cart/${id}`);
  }

  deleteBooking(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  payment(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/payment`,data);
  }

  getOrder(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/order/${id}` );
  }
  
}

