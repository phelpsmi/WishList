import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { ApiUrlService } from './services/api-url.servive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 15 CRUD example';
  isLoggedIn: boolean = false;
  username: string;
  webApiEndPoint: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private elementRef: ElementRef, apiUrlService: ApiUrlService) {
    this.webApiEndPoint = this.elementRef.nativeElement.getAttribute('webApiEndPoint') || location.origin;
    apiUrlService.setApiUrl(this.webApiEndPoint);
  }

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
