import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UserSignInCredentials, UserSignUpCredentials} from '../_models/user/credentials';
import {CurrentUser} from '../_models/user/currentUser';
import {JwtToken} from '../_models/jwt-token/jwtToken';
import {User} from '../_models/user/user';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _endPoint = 'user';
    private _selectedUser: User;
    private _selectedUser$ = new ReplaySubject<User>(1);
    private _currentUserObs$: ReplaySubject<CurrentUser> = new ReplaySubject<CurrentUser>(1);
    private _token: BehaviorSubject<string> = new BehaviorSubject<string>(this.token);
    private _currentUser: CurrentUser;

    get selectedUser(): User {
        return this._selectedUser;
    }

    get selectedUserObs$(): Observable<User> {
        return this._selectedUser$.asObservable();
    }

    get currentUser(): CurrentUser {
        return this._currentUser;
    }

    get currentUserObs$(): Observable<CurrentUser> {
        return this._currentUserObs$.asObservable();
    }

    get token(): string {
        return localStorage.getItem('access_token');
    }

    get token$(): Observable<string> {
        return this._token;
    }

    constructor(private http: HttpClient,
                private router: Router) {
    }

    setSelectedUser(user: User, emit?: boolean) {
        this._selectedUser = user;
        if (emit) {
            this._selectedUser$.next(user);
        }
    }

    register(credentials: UserSignUpCredentials): Observable<unknown> {
        return this.http.post<string>(`${this._endPoint}/register`, credentials);
    }

    login(credentials: UserSignInCredentials): Observable<JwtToken> {
        return this.http.post<JwtToken>(`${this._endPoint}/login`, credentials).pipe(
            tap(response => this._saveToken(response.accessToken))
        );
    }

    loadCurrentUser(): Observable<CurrentUser> {
        return this.http.get<CurrentUser>(`${this._endPoint}/current-user`).pipe(
            tap(user => {
                this._currentUser = user;
                this._currentUserObs$.next(user);
            })
        );
    }

    getUsersByUsername(username: string): Observable<User[]> {
        return this.http.get<User[]>(`${this._endPoint}/search/${username}`);
    }

    signOut(): void {
        localStorage.clear();
        this.router.navigate(['/account/sign-in']);
    }

    private _saveToken(token: string): void {
        localStorage.setItem('access_token', token);
        this._token.next(token);
    }
}
