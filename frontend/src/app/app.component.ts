import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 15 CRUD example';
  isLoggedIn: boolean = false;
  username: any;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.tokenStorageService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;

      if (this.isLoggedIn) {
        this.username = user?.username;
      }
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['']).then(() => window.location.reload);
  }
}
