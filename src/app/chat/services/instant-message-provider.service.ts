import {Injectable} from '@angular/core';
import {ChatRoomService} from '../../_services/chatroom.service';
import {InstantMessage} from '../../_models/instantMessage/instantMessage';
import {combineLatest, Observable, of, ReplaySubject} from 'rxjs';
import {map, startWith, switchMap, take, tap} from 'rxjs/operators';
import {RxStompService} from '@stomp/ng2-stompjs';
import {UserService} from '../../_services/user.service';

@Injectable({
    providedIn: 'root'
})
export class InstantMessageProviderService {
    private _instantMessageList$ = new ReplaySubject<InstantMessage[]>();
    private _instantMessageChanges$ = new ReplaySubject<InstantMessage>();

    get instantMessageListObs$(): Observable<InstantMessage[]> {
        return this._instantMessageList$.asObservable();
    }

    get instantMessageChangesObs$(): Observable<InstantMessage> {
        return this._instantMessageChanges$.asObservable();
    }

    constructor(private chatRoomService: ChatRoomService,
                private rxStompService: RxStompService) {
        this._selectedChatRoomChangesHandler().subscribe(this._instantMessageList$);

        this._instantMessagesChangesHandler().pipe(
            switchMap((instantMessage) => this._selectedChatRoomChangesHandler().pipe(
                take(1),
                map(list => {
                    this._instantMessageList$.next(list);
                    return instantMessage;
                })
            ))
        ).subscribe(this._instantMessageChanges$);
    }

    private _selectedChatRoomChangesHandler(): Observable<InstantMessage[]> {
        return this.chatRoomService.selectedChatRoomObs$.pipe(
            switchMap(chatRoom => this._loadInstantMessageListForSelectedChat(chatRoom?.id))
        );
    }

    private _instantMessagesChangesHandler(): Observable<InstantMessage> {
        return this.rxStompService.watch(`/user/queue/messages`).pipe(
            map(frame => JSON.parse(frame.body)),
            tap(instantMessage => {
                const instantMessageList = this._getInstantMessageListFromStorage(instantMessage.chatRoomId) ?? [];
                instantMessageList.push(instantMessage);
                this._saveInstantMessageListToStorage(instantMessage.chatRoomId, instantMessageList);
            })
        )
    }

    private _loadInstantMessageListForSelectedChat(chatRoomId: number): Observable<InstantMessage[]> {
        if (!chatRoomId) {
            return of([]);
        }

        const instantMessageListFromStorage = this._getInstantMessageListFromStorage(chatRoomId);
        if (!instantMessageListFromStorage) {
            return this.chatRoomService.loadInstantMessageListByChatRoomId(chatRoomId).pipe(
                tap(instantMessageList => this._saveInstantMessageListToStorage(chatRoomId, instantMessageList))
            );
        }

        return of(instantMessageListFromStorage);
    }

    private _saveInstantMessageListToStorage(chatRoomId: number, list: InstantMessage[]): void {
        const storedInstantMessage = localStorage.getItem('instantMessage');
        if (!storedInstantMessage) {
            localStorage.setItem('instantMessage', JSON.stringify({ [`${chatRoomId}`]: list }));
            return;
        }

        try {
            localStorage.setItem('instantMessage', JSON.stringify({
                ...JSON.parse(storedInstantMessage),
                [`${chatRoomId}`]: list
            }));
        } catch (e) {
            localStorage.setItem('instantMessage', JSON.stringify({ [`${chatRoomId}`]: list }));
        }
    }

    private _getInstantMessageListFromStorage(chatRoomId: number): InstantMessage[] {
        try {
            return JSON.parse(localStorage.getItem('instantMessage'))[`${chatRoomId}`];
        } catch (e) {
            return null;
        }
    }
}
