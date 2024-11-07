import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, take, map } from "rxjs";
import { AuthService } from "../services/api/auth.service";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class AuthValidatorResolver implements Resolve<any> {
  constructor(private tokenStorage: TokenStorageService, private authService: AuthService) { }

  resolve(): Observable<any> {
    return this.authService.verify().pipe(take(1), map(authed => {
      if(!authed) {
        this.tokenStorage.signOut();
      }
    }));
  }
}
