import { Component, Input, OnInit } from '@angular/core';
import { WishService } from 'src/app/services/api/wish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Wish } from 'src/app/models/wish.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../../../services/token-storage.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css']
})
export class WishDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentWish: Wish = {
    title: '',
    description: '',
    published: false
  };

  message = '';
  currentUser: User;

  constructor(
    private wishService: WishService,
    private route: ActivatedRoute,
    private router: Router,
    tokenService: TokenStorageService) {
      tokenService.getUser().subscribe(u => this.currentUser = u);
    }

  ngOnInit(): void {
    if (!this.viewMode && this.route.snapshot.params["id"]) {
      this.message = '';
      this.getWish(this.route.snapshot.params["id"]);
    }
  }

  getWish(id: string): void {
    this.wishService.get(id)
      .subscribe({
        next: (data) => {
          this.currentWish = data;
          console.log(data);
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentWish.title,
      description: this.currentWish.description,
      published: status
    };

    this.message = '';

    this.wishService.update(this.currentWish.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentWish.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  updateClaim(claim: boolean): void {
    const data = {
      gifterId: claim ? this.currentUser.id : null
    };

    this.message = '';

    this.wishService.update(this.currentWish.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentWish.gifterId = claim ? this.currentUser.id : null;
          this.message = res.message ? res.message : 'The claim status was changed successfully!';
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  updateWish(): void {
    this.message = '';

    this.wishService.update(this.currentWish.id, this.currentWish)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Wish was updated successfully!';
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  deleteWish(): void {
    this.wishService.delete(this.currentWish.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/Wishes']);
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

}
