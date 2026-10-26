import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wish } from '../../models/wish.model';
import { Family } from '../../models/family.model';
import { ApiUrlService } from '../api-url.servive';
import { BaseApiService } from './base.service';

const areaRoute = 'api/families';

@Injectable({
  providedIn: 'root'
})
export class FamilyService extends BaseApiService {
  constructor(private http: HttpClient, apiUrlService: ApiUrlService) {
    super(areaRoute, apiUrlService);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.getUrl(''), data);
  }

  getOwn(): Observable<Wish[]> {
    return this.http.get<Family[]>(this.getUrl(''));
  }

  getAll(): Observable<Wish[]> {
    return this.http.get<Family[]>(this.getUrl('all'));
  }

  findByName(title: any): Observable<Wish[]> {
    return this.http.get<Wish[]>(`${this.getUrl('')}`, {params: {name: title}});
  }

  join(id: any): Observable<any> {
    return this.http.get<any>(this.getUrl(`join/${id}`));
  }

  leave(id: any): Observable<any> {
    return this.http.get<any>(this.getUrl(`leave/${id}`));
  }

  get(id: any): Observable<Wish> {
    return this.http.get<Wish>(this.getUrl(id.toString()));
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
}

// // Create a new Tutorial
// wishRouter.post("/", [AuthJwt.verifyToken], FamilyController.create);

// // Retrieve own wishes
// wishRouter.get("/", [AuthJwt.verifyToken], FamilyController.ownFamilies);

// // Retrieve all published Tutorials
// wishRouter.get("/all", FamilyController.findAll);

// // Add current user to family to id
// wishRouter.put("/join/:id", [AuthJwt.verifyToken], FamilyController.join);

// // Retrieve a single family with id
// wishRouter.get("/:id", FamilyController.findOne);

// // Update a Tutorial with id
// wishRouter.put("/:id", FamilyController.update);

// // Delete a Tutorial with id
// wishRouter.delete("/:id", FamilyController.delete);

// // Delete all Tutorials
// wishRouter.delete("/", FamilyController.deleteAll);
