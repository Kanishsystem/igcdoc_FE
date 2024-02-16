import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionStorageServiceService } from './core/session-storage-service.service';
import { NotifyService } from './common/notify.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: SessionStorageServiceService, private router: Router,private notify: NotifyService,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data.expectedRole; // Role required for the route
   // const userRole = this.authService.getRoleName(); // Get user's role from the authentication service
   // console.log("userRole", userRole , " expected roles " , expectedRole , "  check " , expectedRole.includes(userRole));
   
   /*
   if (Array.isArray(expectedRole) && expectedRole.includes(userRole)) {
      return true; // User has the required role, allow access
    } else if(userRole === expectedRole) {
      return true;
     } else {
        this.notify.error("un-authorized Access");
        this.authService.clear();
      // User doesn't have the required role, redirect to a different route or show an error message
      this.router.navigate(['/']);
      return false;
    }*/
    const role_check = this.authService.checkRoleExists(expectedRole);
    return role_check;
  }
}