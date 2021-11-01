import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthReverseGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    redirectToHomePage(): boolean {
        this.router.navigate(['']);
        return false;
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this.userService.token;
        if (!token) {
            return true;
        } else {
            return this.userService.currentUserObs$.pipe(map(user => {
                if (user) {
                    return this.redirectToHomePage();
                } else {
                    return true;
                }
            }));
        }
    }

}
