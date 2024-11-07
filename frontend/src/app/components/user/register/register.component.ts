import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage: string = "";
  success: boolean = false;

  constructor(private authService: AuthService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, [Validators.required]],
      lastName: []
    })
  }

  onSubmit(): void {
    const data = this.form.value as User;

    this.authService.register(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.success = true;
        },
        error: (e: HttpErrorResponse) => this.errorMessage = e.error.message ?? e.message ?? JSON.stringify(e)
      });
  }

}
