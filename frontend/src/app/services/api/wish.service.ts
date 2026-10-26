import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wish } from '../../models/wish.model';
import { ApiUrlService } from '../api-url.servive';
import { BaseApiService } from './base.service';

const areaRoute = 'api/wishes';

@Injectable({
  providedIn: 'root'
})
export class WishService extends BaseApiService {
  constructor(private http: HttpClient, apiUrlService: ApiUrlService) {
    super(areaRoute, apiUrlService);
  }

  getAll(userId: any = 0): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.getUrl(''), {params: {userId: userId}});
  }

  getGifts(): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.getUrl('gifts'))
  }

  get(id: any): Observable<Wish> {
    return this.http.get<Wish>(this.getUrl(id.toString()));
  }

  create(data: any): Observable<any> {
    return this.http.post(this.getUrl(''), data);
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

  findByTitle(title: any): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.getUrl(''),  {params: {title: title}});
  }
}
