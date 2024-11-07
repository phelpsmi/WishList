import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';
import { WishService } from 'src/app/services/api/wish.service';
import { Family } from '../../../models/family.model';
import { FamilyService } from '../../../services/api/family.service';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.css']
})
export class FamilyListComponent implements OnInit {

  families?: Family[];
  currentFamily: Family = {};
  currentIndex = -1;
  title = '';

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.retrieveWishes();
  }

  retrieveWishes(): void {
    this.familyService.getAll()
      .subscribe({
        next: (data) => {
          this.families = data;
          console.log(data);
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveWishes();
    this.currentFamily = {};
    this.currentIndex = -1;
  }

  setActiveWish(Wish: Wish, index: number): void {
    this.currentFamily = Wish;
    this.currentIndex = index;
  }
}
