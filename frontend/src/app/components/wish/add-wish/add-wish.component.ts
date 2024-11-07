import { Component } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';
import { WishService } from 'src/app/services/api/wish.service';

@Component({
  selector: 'app-add-wish',
  templateUrl: './add-wish.component.html',
  styleUrls: ['./add-wish.component.css']
})
export class AddWishComponent {

  wish: Wish = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private wishService: WishService) { }

  saveWish(): void {
    const data = {
      title: this.wish.title,
      description: this.wish.description
    };

    this.wishService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newWish(): void {
    this.submitted = false;
    this.wish = {
      title: '',
      description: '',
      published: false
    };
  }

}
