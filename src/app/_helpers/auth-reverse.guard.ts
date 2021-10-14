import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthReverseGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.user;
        if (user) {
            this.router.navigate(['/chat'], { queryParams: { returnUrl: state.url }});
            return false;
        }

        return true;
    }

}
