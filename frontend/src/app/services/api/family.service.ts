import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wish } from '../../models/wish.model';
import { Family } from '../../models/family.model';

const baseUrl = 'http://192.168.0.185:8080/api/families';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getOwn(): Observable<Wish[]> {
    return this.http.get<Family[]>(baseUrl);
  }

  getAll(): Observable<Wish[]> {
    return this.http.get<Family[]>(`${baseUrl}/all`);
  }

  findByName(title: any): Observable<Wish[]> {
    return this.http.get<Wish[]>(`${baseUrl}?name=${title}`);
  }

  join(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/join/${id}`);
  }

  leave(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/leave/${id}`);
  }

  get(id: any): Observable<Wish> {
    return this.http.get<Wish>(`${baseUrl}/${id}`);
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
