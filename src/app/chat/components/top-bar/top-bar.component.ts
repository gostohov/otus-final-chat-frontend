import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {UserService} from '../../../_services/user.service';
import {ChatRoomService} from '../../../_services/chatroom.service';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent implements OnInit {
    chatName: Observable<string>;

    constructor(private userService: UserService,
                private chatRoomService: ChatRoomService) {
    }

    ngOnInit(): void {
        this.chatName = merge(
            this.userService.selectedUserObs$.pipe(
                filter(user => !!user),
                map(user => `${user.firstName} ${user.lastName}`)
            ),
            this.chatRoomService.selectedChatRoomObs$.pipe(
                filter(chatRoom => chatRoom != null),
                map(({users}) => {
                    const user = users.find(user => user.id !== this.userService.currentUser.id);
                    return `${user.firstName} ${user.lastName}`;
                })
            )
        );
    }

}
