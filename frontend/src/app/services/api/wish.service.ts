import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wish } from '../../models/wish.model';

const baseUrl = 'http://localhost:8080/api/wishes';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }

  getAll(userId: any = 0): Observable<Wish[]> {
    return this.http.get<Wish[]>(baseUrl, {params: {userId: userId}});
  }

  get(id: any): Observable<Wish> {
    return this.http.get<Wish>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
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

  findByTitle(title: any): Observable<Wish[]> {
    return this.http.get<Wish[]>(`${baseUrl}?title=${title}`);
  }
}
