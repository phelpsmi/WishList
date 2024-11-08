import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

const baseUrl = 'http://192.168.0.185:8080/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: User): Observable<any> {
    return this.http.post(`${baseUrl}/signup`, data);
  }

  login(data: {username: string, password: string}): Observable<any> {
    return this.http.post(`${baseUrl}/signin`, data);
  }

  update(id: number, data: User): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  verify(): Observable<any> {
    return this.http.get(`${baseUrl}/verify`);
  }
}
