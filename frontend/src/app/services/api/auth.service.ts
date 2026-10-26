import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ApiUrlService } from '../api-url.servive';
import { BaseApiService } from './base.service';

const areaRoute = '/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {
  constructor(private http: HttpClient, apiUrlService: ApiUrlService) {
    super(areaRoute, apiUrlService);
  }

  register(data: User): Observable<any> {
    return this.http.post(this.getUrl('signup'), data);
  }

  login(data: {username: string, password: string}): Observable<any> {
    return this.http.post(this.getUrl('signin'), data);
  }

  update(id: number, data: User): Observable<any> {
    return this.http.put(this.getUrl(id.toString()), data);
  }

  verify(): Observable<any> {
    return this.http.get(this.getUrl('verify'));
  }
}
