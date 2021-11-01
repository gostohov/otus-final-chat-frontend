import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {User} from '../../../_models/user/user';
import {ChatroomListProviderService} from '../../services/chatroom-list-provider.service';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from '../../../_services/user.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatRoomService} from '../../../_services/chatroom.service';

@UntilDestroy()
@Component({
    selector: 'app-group-chat-creator',
    templateUrl: './group-chat-creator.component.html',
    styleUrls: ['./group-chat-creator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupChatCreatorComponent implements OnInit {
    @Input() display: boolean;
    @Output() displayChange = new EventEmitter<boolean>();

    form: FormGroup;

    private _users: User[] = [];
    private _filterHandlerUsers: User[] = [];
    private _filterHandler$ = new Subject<string>();

    get users(): User[] {
        return [...this._users, ...this._filterHandlerUsers];
    }

    constructor(private chatroomListProviderService: ChatroomListProviderService,
                private userService: UserService,
                private fb: FormBuilder,
                private chatRoomService: ChatRoomService) {
    }

    ngOnInit(): void {
        this._createForm();
        this._extractUsersFromChatListChanges().subscribe(users => this._users = users);
        this._extractUsersAsync().subscribe(users => this._filterHandlerUsers = users)
    }

    displayChangeEmit(status: boolean): void {
        this.displayChange.emit(status);
    }

    closeCreator() {
        this.display = false;
        this.displayChange.emit(false);
    }

    createGroupChat() {
        this.chatRoomService.createChatRoom({
            ...this.form.value,
            usernameList: [
                ...this.form.value.usernameList.map(user => user.username),
                this.userService.currentUser.username
            ]
        }).subscribe();
    }

    filterHandler(event: any): void {
        const username = event.filter;
        const searchStringNotValid = !username || !username.match('^[A-Za-z0-9]+$');

        if (searchStringNotValid) {
            this._filterHandlerUsers = [];
            return;
        }

        this._filterHandler$.next(username);
    }

    selectUser(users: User[]) {
        const list = [...this._users, ...users];
        this._users = this._filterUniqueUsers(list);
    }

    private _createForm(): void {
        this.form = this.fb.group({
            name: [null, [Validators.required]],
            description: [null],
            usernameList: [null, [Validators.required]]
        });
    }

    private _extractUsersAsync(): Observable<User[]> {
        return this._filterHandler$.pipe(
            untilDestroyed(this),
            switchMap(username => this.userService.getUsersByUsername(username).pipe(
                map(users => users.filter(user => !this._users.some(u => u.id === user.id)))
            ))
        );
    }

    private _extractUsersFromChatListChanges(): Observable<User[]> {
        return this.chatroomListProviderService.chatRoomListObs$.pipe(
            untilDestroyed(this),
            map(list => {
                const users = (list.map(cr => cr.users) as any)
                                   .flat()
                                   .filter(user => user.id !== this.userService.currentUser.id) as User[];
                return this._filterUniqueUsers(users);
            })
        );
    }

    private _filterUniqueUsers(list: User[]): User[] {
        return [...new Map(list.map(item => [item.id, item])).values()] as User[];
    }
}
