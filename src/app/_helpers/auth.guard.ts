import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    redirectToLoginPage(): boolean {
        this.router.navigate(['/account/sign-in']);
        return false;
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this.userService.token;
        if (token) {
            return this.userService.currentUserObs$.pipe(
                map(user => {
                    if (user) {
                        return true;
                    } else {
                        return this.redirectToLoginPage();
                    }
                })
            );
        } else {
            return this.redirectToLoginPage();
        }
    }

}
