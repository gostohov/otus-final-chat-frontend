import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {InstantMessage} from '../_models/instantMessage/instantMessage';
import {ChatRoom} from '../_models/chatroom/chatRoom';
import {HttpClient} from '@angular/common/http';
import {ChatRoomCreate} from '../_models/chatroom/chatRoomCreate';

@Injectable({
    providedIn: 'root'
})
export class ChatRoomService {
    private _endPoint = 'chatroom';
    private _selectedChatRoom: ChatRoom;
    private _selectedChatRoom$ = new ReplaySubject<ChatRoom>(1);

    get selectedChatRoom(): ChatRoom {
        return this._selectedChatRoom;
    }
    set selectedChatRoom(chatRoom: ChatRoom) {
        this._selectedChatRoom = chatRoom;
        this._selectedChatRoom$.next(chatRoom);
    }

    get selectedChatRoomObs$(): Observable<ChatRoom> {
        return this._selectedChatRoom$.asObservable();
    }

    constructor(private rxStompService: RxStompService,
                private http: HttpClient) {
    }

    createChatRoom(chatRoomCreate: ChatRoomCreate): Observable<any> {
        return this.http.post(`${this._endPoint}/create-chatroom`, chatRoomCreate);
    }

    findChatRoomsByUserIds(ids: number[]): Observable<ChatRoom[]> {
        return this.http.get<ChatRoom[]>(`${this._endPoint}/find-by-user?ids=${ids.toString()}`);
    }

    findChatRoomId(id: number): Observable<ChatRoom> {
        return this.http.get<ChatRoom>(`${this._endPoint}/find-by-id?id=${id}`);
    }

    loadInstantMessageListByChatRoomId(id: number): Observable<InstantMessage[]> {
        return this.http.get<InstantMessage[]>(`${this._endPoint}/message-list?crId=${id}`);
    }

    sendInstantMessage(instantMessage: InstantMessage) {
        return this.rxStompService.publish({
            destination: '/chatroom/send.message',
            body: JSON.stringify(instantMessage)
        });
    }
}
