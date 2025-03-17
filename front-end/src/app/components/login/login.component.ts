import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HelperClass } from '../../helpers/HelperClass';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  onSubmit(): void {
    if (!HelperClass.areAllFieldsFilled({ email: this.email, password: this.password })) {
      this.openNotification('Preencha todos os campos!', 2000);
      return
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('email', response.email);
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = HelperClass.returnTranslatedErrorMessage(error.error);
      }
    })
  }

  openNotification(message: string, duration: number = 1000): void {
    this.snackbar.open(message, '', {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}