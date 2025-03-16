import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HelperClass } from '../../helpers/HelperClass';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  onSubmit(): void {
    if (!HelperClass.areAllFieldsFilled(this.user)) {
      this.openNotification('Preencha todos os campos!', 2000);
      return
    }

    this.authService.register(this.user).pipe(
      switchMap(() => {
        this.openNotification('Registro realizado com sucesso', 2000);
        return this.authService.login(this.user.email, this.user.password);
      })
    ).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = HelperClass.returnTranslatedErrorMessage(error.error);
      }
    });
  }

  openNotification(message: string, duration: number = 1000): void {
    this.snackbar.open(message, '', {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
