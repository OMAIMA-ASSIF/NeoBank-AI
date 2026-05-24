import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    if(this.authService.roles.includes("ADMIN")){
      return true;
    }
    else {
      this.router.navigateByUrl("admin/notAuthorized");
      return true;
    }
  }
}