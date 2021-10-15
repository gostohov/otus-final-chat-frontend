import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RxStomp, RxStompConfig} from '@stomp/rx-stomp';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable, of} from 'rxjs';
import {User} from '../_models/user';
import {AuthService} from '../_services/auth.service';
import {RxStompService} from '@stomp/ng2-stompjs';

interface Message {
    chatRoomId: String;
    username: String;
    date: Date;
    fromUser: String;
    toUser: String;
    text: String;
}

@UntilDestroy()
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
    searchBarFormControl = new FormControl();
    searchBarLoading = false;
    contactList$: Observable<User[]>;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.contactList$ = this.searchBarFormControl.valueChanges.pipe(
            untilDestroyed(this),
            tap(searchString => this.searchBarLoading = searchString.length > 0),
            debounceTime(300),
            switchMap(searchString => !searchString || !searchString.match("^[A-Za-z0-9]+$") ? of([]) : this.http.get<User[]>(`list/${searchString}`)),
            tap(() => this.searchBarLoading = false)
        );
    }
}
