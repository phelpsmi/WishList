import { EventEmitter, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './api/auth.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private currentUser = new BehaviorSubject<User>(null);

  constructor() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      this.currentUser.next(JSON.parse(user) as User);
    }
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUser.next(user);
  }

  public getUser(): BehaviorSubject<User | null> {
    return this.currentUser;
  }
}

@Injectable({providedIn: 'root'})
export class RootRedirect implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.tokenStorage.getToken()){
      this.router.navigate(['wish/all']);
    }else{
      this.router.navigate(['login']);
    }
    return false;
  }
}

@Injectable({providedIn: 'root'})
export class HandleLoginGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login'])
      return false;
    } else {
      return true;
    }
  }
}

@Injectable({providedIn: 'root'})
export class HandleVisitorGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.tokenStorage.getToken()) {
      return true;
    } else {
      this.router.navigate(['/wish/all'])
      return false;
    }
  }
}
