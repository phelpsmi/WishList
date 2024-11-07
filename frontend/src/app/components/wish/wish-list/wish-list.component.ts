import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';
import { WishService } from 'src/app/services/api/wish.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  wishes?: Wish[];
  currentWish: Wish = {};
  currentIndex = -1;
  title = '';

  constructor(private wishService: WishService) { }

  ngOnInit(): void {
    this.retrieveWishes();
  }

  retrieveWishes(): void {
    this.wishService.getAll()
      .subscribe({
        next: (data) => {
          this.wishes = data;
          console.log(data);
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveWishes();
    this.currentWish = {};
    this.currentIndex = -1;
  }

  setActiveWish(Wish: Wish, index: number): void {
    this.currentWish = Wish;
    this.currentIndex = index;
  }

  removeAllWishes(): void {
    this.wishService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentWish = {};
    this.currentIndex = -1;

    this.wishService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.wishes = data;
          console.log(data);
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

}
