import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ChatRoom} from '../../../_models/chatroom/chatRoom';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ChatRoomService} from '../../../_services/chatroom.service';
import {User} from '../../../_models/user/user';
import {UserService} from '../../../_services/user.service';

@UntilDestroy()
@Component({
    selector: 'app-sidebar-list',
    templateUrl: './sidebar-list.component.html',
    styleUrls: ['./sidebar-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarList implements OnInit {
    @Input() chatRoomList: ChatRoom[];
    @Input() users: User[];

    selectedUser: User;
    selectedChatRoom: ChatRoom;

    constructor(private chatRoomService: ChatRoomService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.selectedUserObs$
            .pipe(untilDestroyed(this))
            .subscribe(user => this.selectedUser = user);

        this.chatRoomService.selectedChatRoomObs$
            .pipe(untilDestroyed(this))
            .subscribe(chatRoom => this.selectedChatRoom = chatRoom);
    }

    selectUser(user: User): void {
        this.userService.setSelectedUser(user, true);
    }

    selectChatRoom(chatRoom: ChatRoom): void {
        this.chatRoomService.selectedChatRoom = chatRoom;
    }

    trackChatRoomList(index: number, chatRoom: ChatRoom) {
        return chatRoom.id;
    }

    trackUserList(index: number, user: User) {
        return user.id;
    }
}
