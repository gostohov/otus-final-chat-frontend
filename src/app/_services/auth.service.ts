import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {switchMap, tap} from 'rxjs/operators';
import {UserSignInCredentials, UserSignUpCredentials} from '../_models/credentials';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token: string;
    private _user: User;

    get user(): User {
        return this._user ?? JSON.parse(localStorage.getItem('user') as string);
    }

    set user(user: User) {
        this._user =  user;
    }

    get token(): string {
        return this._token ?? localStorage.getItem('token') ?? null;
    }

    constructor(private http: HttpClient,
                private router: Router) {
    }

    signIn(credentials: UserSignInCredentials): Observable<HttpResponse<User>> {
        return this.http.post<User>('user/login', credentials, { observe: 'response' }).pipe(
            tap((response: HttpResponse<User>) => {
                this.saveToken(response.headers.get('Jwt-Token') as string);
                this.saveUser(response.body as User);
                this.router.navigate(['/chat']);
            })
        );
    }

    signUp(credentials: UserSignUpCredentials): Observable<HttpResponse<User>> {
        const {username, password} = credentials;
        return this.http.post<User>('user/register', credentials).pipe(
            switchMap(() => this.signIn({username, password}))
        );
    }

    saveToken(token: string): void {
        this._token = token;
        localStorage.setItem('token', token);
    }

    saveUser(user: User): void {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user))
    }
}
