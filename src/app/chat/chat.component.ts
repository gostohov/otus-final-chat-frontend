import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, take, tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable, of} from 'rxjs';
import {User} from '../_models/user/user';
import {UserService} from '../_services/user.service';
import {ChatRoom} from '../_models/chatroom/chatRoom';
import {ChatRoomService} from '../_services/chatroom.service';
import {InstantMessage} from '../_models/instantMessage/instantMessage';
import {ChatroomListProviderService} from './services/chatroom-list-provider.service';
import {InstantMessageProviderService} from './services/instant-message-provider.service';
import {CurrentUser} from '../_models/user/currentUser';

@UntilDestroy()
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, AfterViewInit {
    @ViewChild('messageListContainer') messageListContainer: ElementRef;

    searchBarFormControl = new FormControl();
    searchBarLoading: boolean;
    displaySidebarOverlay: boolean;
    chatRoomList$: Observable<ChatRoom[]>;
    searchUsers$: Observable<User[]>;
    instantMessages$: Observable<InstantMessage[]>;
    selectedChatRoom$: Observable<ChatRoom>;
    selectedUser$: Observable<User>;

    constructor(private userService: UserService,
                private chatRoomService: ChatRoomService,
                private chatRoomListProviderService: ChatroomListProviderService,
                private instantMessageProviderService: InstantMessageProviderService) {}

    ngOnInit() {
        this.selectedUser$ = this.userService.selectedUserObs$;
        this.selectedChatRoom$ = this.chatRoomService.selectedChatRoomObs$;
        this.searchUsers$ = this._searchHandler();
        this.chatRoomList$ = this.chatRoomListProviderService.chatRoomListObs$;
        this.instantMessages$ = this.instantMessageProviderService.instantMessageListObs$;

        this.userService.selectedUserObs$.pipe(
            untilDestroyed(this),
            switchMap(user => this._selectFirstChatRoom(user))
        ).subscribe();
    }

    ngAfterViewInit() {
        this._fireDetectChanges();
    }

    toggleSidebarOverlay(): void {
        this.displaySidebarOverlay = !this.displaySidebarOverlay;
    }

    private _searchHandler(): Observable<User[]> {
        return this.searchBarFormControl.valueChanges.pipe(
            untilDestroyed(this),
            debounceTime(300),
            switchMap(username => {
                const searchStringNotValid = !username || !username.match('^[A-Za-z0-9]+$');
                this.searchBarLoading = searchStringNotValid;
                if (searchStringNotValid) {
                    this.userService.setSelectedUser(null, true);
                    return of(null);
                }
                return this.userService.getUsersByUsername(username);
            }),
            tap(() => this.searchBarLoading = false)
        );
    }

    private _fireDetectChanges(): void {
        this.searchBarFormControl.setValue(null);
    }

    private _selectFirstChatRoom(user: User): Observable<any> {
        return this.chatRoomListProviderService.chatRoomListObs$.pipe(
            distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
            tap(list => {
                if (list && list.length > 0) {
                    this.chatRoomService.selectedChatRoom = list[0];
                } else {
                    this.chatRoomService.selectedChatRoom = null;
                }
            })
        )
    }

    private _scrollToBottom(): void {
        console.warn(this.messageListContainer.nativeElement);
    }
}
