import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/api/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { UserService } from '../../../services/api/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  form: FormGroup;
  errorMessage: string = "";
  success: boolean = false;
  user: User;

  constructor(private authService: AuthService, formBuilder: FormBuilder, private tokenStorage: TokenStorageService) {
    this.form = formBuilder.group({
      username: [null, [Validators.required]],
      password: [null],
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, [Validators.required]],
      lastName: []
    });

    tokenStorage.getUser().subscribe(user => {
      this.form.patchValue({
        username: user.username,
        password: '',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });
      this.user = user;
    })
  }

  onSubmit(): void {
    const data = this.form.value as User;

    this.authService.update(this.user.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.success = true;
          this.tokenStorage.saveUser({...this.user, ...this.form.value, password: null});
        },
        error: (e: HttpErrorResponse) => this.errorMessage = e.error.message ?? e.message ?? JSON.stringify(e)
      });
  }

}
