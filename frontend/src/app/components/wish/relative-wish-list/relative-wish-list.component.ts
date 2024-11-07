import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';
import { WishService } from 'src/app/services/api/wish.service';
import { UserService } from '../../../services/api/user.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-wish-list',
  templateUrl: './relative-wish-list.component.html',
  styleUrls: ['./relative-wish-list.component.css']
})
export class RelativeWishListComponent implements OnInit {

  currentWish: Wish = {};
  currentUserIndex = -1;
  currentWishIndex = -1;
  title = '';
  relatives: User[];
  familyWishes: Wish[][] = [];
  currentUser: User = {};


  constructor(private wishService: WishService, private userService: UserService, tokenStorageService: TokenStorageService) {
    tokenStorageService.getUser().subscribe(u => this.currentUser = u);
  }

  ngOnInit(): void {
    this.userService.getRelatives().subscribe(users => {
      this.relatives = users;
      users.forEach(user => {
        this.retrieveWishes(user.id);
      })
    });
  }

  retrieveWishes(userId = 0): void {
    this.wishService.getAll(userId)
      .subscribe({
        next: (data) => {
          const index = this.relatives.findIndex(user => user.id === userId);
          this.familyWishes[index] = data;
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveWishes();
    this.currentWish = {};
    this.currentUserIndex = -1;
    this.currentWishIndex = -1;
  }

  setActiveWish(Wish: Wish, userIndex: number, wishIndex: number): void {
    this.currentWish = Wish;
    this.currentUserIndex = userIndex;
    this.currentWishIndex = wishIndex;
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

}
