import {Injectable} from '@angular/core';
import {ChatRoomService} from '../../_services/chatroom.service';
import {ChatRoom} from '../../_models/chatroom/chatRoom';
import {combineLatest, Observable, of, ReplaySubject} from 'rxjs';
import {UserService} from '../../_services/user.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {ChatRoomType} from '../../_models/chatroom/chatRoomType';
import {InstantMessageProviderService} from './instant-message-provider.service';

@Injectable({
    providedIn: 'root'
})
export class ChatroomListProviderService {
    private _chatRoomList: ChatRoom[];
    private _chatRoomList$ = new ReplaySubject<ChatRoom[]>();

    get chatRoomList(): ChatRoom[] {
        return this._chatRoomList;
    }
    set chatRoomList(chatRoomList: ChatRoom[]) {
        this._chatRoomList = chatRoomList;
        this._chatRoomList$.next(chatRoomList);
    }
    get chatRoomList$(): ReplaySubject<ChatRoom[]> {
        return this._chatRoomList$;
    }
    get chatRoomListObs$(): Observable<ChatRoom[]> {
        return this._chatRoomList$.asObservable();
    }

    constructor(private chatRoomService: ChatRoomService,
                private userService: UserService,
                private instantMessageProviderService: InstantMessageProviderService) {
        this._currentUserChangesHandler().subscribe(this._chatRoomList$);
        this._selectedUserChangesHandler().subscribe(this._chatRoomList$);
        this._instantMessageChangesHandler().subscribe(this._chatRoomList$);
    }

    private _currentUserChangesHandler(): Observable<ChatRoom[]> {
        return this.userService.currentUserObs$.pipe(
            map(currentUser => currentUser.chatRooms),
            map(list => {
                list = this._setChatRoomListInfo(list);
                list = this._sortChatRoomListByLastTimeUpdated(list);
                this._selectFirstChatRoom(list);
                this._selectRecipientUserFirstChatRoom();
                this._saveChatRoomListToStorage(list);
                return list;
            })
        );
    }

    private _selectedUserChangesHandler(): Observable<ChatRoom[]> {
        return this.userService.selectedUserObs$.pipe(
            switchMap(user => {
                return user ? this.chatRoomService.findChatRoomsByUserIds([user.id, this.userService.currentUser.id]).pipe(
                        map(list => {
                            list = this._setChatRoomListInfo(list);
                            list = this._sortChatRoomListByLastTimeUpdated(list);
                            return list;
                        })
                    )
                    : of(this._getChatRoomListFromStorage());
            })
        )
    }

    private _instantMessageChangesHandler(): Observable<ChatRoom[]> {
        return this.instantMessageProviderService.instantMessageChangesObs$.pipe(
            switchMap(({chatRoomId, date, authorUsername}) => {
                let list = this._getChatRoomListFromStorage();
                const chatRoom = list.find(cr => cr.id === chatRoomId);
                if (!chatRoom) {
                    return this.chatRoomService.findChatRoomId(chatRoomId).pipe(
                        map(chatRoom => {
                            list.push(chatRoom);
                            list = this._setChatRoomListInfo(list);
                            list = this._sortChatRoomListByLastTimeUpdated(list);
                            this._saveChatRoomListToStorage(list);

                            return list;
                        })
                    )
                } else {
                    chatRoom.lastTimeUpdated = new Date(date);
                    list = this._sortChatRoomListByLastTimeUpdated(list);
                    return of(list);
                }
            })
        );
    }

    private _saveChatRoomListToStorage(list: ChatRoom[]): void {
        localStorage.setItem('chatRoomList', JSON.stringify(list));
    }

    private _updateChatRoomStorage(chatRoom): void {
        const chatRoomList = this._getChatRoomListFromStorage();
        const newChatRoomList = chatRoomList.map(cr => cr.id === chatRoom.id ? chatRoom : cr);
        this._saveChatRoomListToStorage(newChatRoomList);
    }

    private _getChatRoomListFromStorage(): ChatRoom[] {
        try {
            return JSON.parse(localStorage.getItem('chatRoomList'))
        } catch (e) {
            return [];
        }
    }

    private _setChatRoomListInfo(chatRoomList: ChatRoom[]): ChatRoom[] {
        const id = this.userService.currentUser.id;
        return chatRoomList.map(chatRoom => {
            if (chatRoom.type === ChatRoomType.PRIVATE) {
                const {imageUrl, firstName, lastName} = chatRoom.users.find(user => user.id !== id);
                chatRoom.imageUrl = imageUrl;
                chatRoom.name = `${firstName} ${lastName}`;
            }
            chatRoom.lastTimeUpdated = chatRoom.lastTimeUpdated ? new Date(chatRoom.lastTimeUpdated) : undefined;
            return chatRoom;
        })
    }

    private _sortChatRoomListByLastTimeUpdated(chatRoomList: ChatRoom[]): ChatRoom[] {
        if (!chatRoomList || chatRoomList.length === 0) {
            return chatRoomList;
        }

        return chatRoomList.sort((a, b) => new Date(b.lastTimeUpdated).getTime() - new Date(a.lastTimeUpdated).getTime())
    }

    private _selectFirstChatRoom(chatRoomList: ChatRoom[]): void {
        this.chatRoomService.selectedChatRoom = chatRoomList.length > 0 ? chatRoomList[0] : null;
    }

    private _selectRecipientUserFirstChatRoom(): void {
        if (this.chatRoomService.selectedChatRoom) {
            this.userService.setSelectedUser(
                this.chatRoomService.selectedChatRoom.users.find(user => user.id !== this.userService.currentUser.id),
                false
            );
        }
    }

}
