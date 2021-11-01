import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../_services/user.service';

@Injectable()
export class JwtAppendInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.userService.token;
        const modifiedRequest = request.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
        return next.handle(token ? modifiedRequest : request);
    }
}
