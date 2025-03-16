import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    const isPublic = url === '/login' || url === '/register';
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn && isPublic) {
      this.router.navigate(['/home']);
      return false;
    }
    if (!isLoggedIn && !isPublic) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}