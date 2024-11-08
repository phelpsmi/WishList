import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';
import { WishService } from 'src/app/services/api/wish.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {
  wishes?: Wish[];
  currentWish: Wish = {};
  currentIndex = -1;
  title = '';
  creatingWish = false;

  constructor(private wishService: WishService) { }

  ngOnInit(): void {
    this.retrieveWishes();
  }

  retrieveWishes(): void {
    this.wishService.getGifts()
      .subscribe({
        next: (data) => {
          this.wishes = data;
          console.log(data);
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  setActiveWish(Wish: Wish, index: number): void {
    this.currentWish = Wish;
    this.currentIndex = index;
  }

  unclaimedWish(wish: Wish) {
    const index = this.wishes.indexOf(wish);

    if (this.currentIndex === index) this.setActiveWish({}, -1)

    if (index > -1)
      this.wishes.splice(index, 1);
  }
}
