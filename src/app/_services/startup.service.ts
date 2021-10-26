import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
	providedIn: 'root'
})
export class StartupService {

	constructor(private readonly userService: UserService) {
	}

	load(): void {
		this.userService.token$.pipe(
			switchMap(token => token ? this.userService.loadCurrentUser() : of(null))
		).subscribe();
	}
}
