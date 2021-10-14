import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../_services/auth.service';

@Injectable()
export class JwtAppendInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.authService.token;
        const modifiedRequest = request.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
        return next.handle(token ? modifiedRequest : request);
    }
}
