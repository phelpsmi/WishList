import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/api/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string = "";
  success: boolean = false;

  constructor(private authService: AuthService, formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private router: Router) {
    this.form = formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, []]
    })
  }

  onSubmit(): void {
    const data = this.form.value;

    this.authService.login(data).subscribe({
        next: (res: {user: User, accessToken: string}) => {
          this.tokenStorage.saveToken(res.accessToken);
          this.tokenStorage.saveUser(res.user);

          this.reloadPage();
        },
        error: (e: HttpErrorResponse) => this.errorMessage = e.error.message ?? e.message ?? JSON.stringify(e)
      });
  }

  reloadPage(): void {
    this.router.navigate(['']).then(() => window.location.reload);
  }

}
