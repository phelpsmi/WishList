import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  login(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/login`, data);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  getRelatives(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/relatives`)
  }
}
