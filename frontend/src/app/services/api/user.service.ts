import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ApiUrlService } from '../api-url.servive';
import { BaseApiService } from './base.service';

const areaRoute = 'api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {
  constructor(private http: HttpClient, apiUrlService: ApiUrlService) {
    super(areaRoute, apiUrlService);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.getUrl(''), data);
  }

  login(id: any, data: any): Observable<any> {
    return this.http.put(this.getUrl('login'), data);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.getUrl(''));
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(this.getUrl(id.toString()));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.getUrl(id.toString()), data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.getUrl(id.toString()));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.getUrl(''));
  }

  getRelatives(): Observable<User[]> {
    return this.http.get<User[]>(this.getUrl('relatives'))
  }
}
