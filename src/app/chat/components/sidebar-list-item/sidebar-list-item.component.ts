import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {User} from '../../../_models/user/user';
import {ChatRoom} from '../../../_models/chatroom/chatRoom';

@Component({
    selector: 'app-sidebar-list-item',
    templateUrl: './sidebar-list-item.component.html',
    styleUrls: ['./sidebar-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarListItemComponent {
    @Input() chatRoom: ChatRoom;
    @Input() user: User;

    get imageUrl(): string {
        return this.user?.imageUrl ?? this.chatRoom?.imageUrl ?? '/assets/images/group-chat-default.png';
    }

    get name(): string {
        return this.userFullName ?? this.chatRoom?.name;
    }

    get userFullName(): string {
        return this.user ? `${this.user.firstName} ${this.user.lastName}` : null;
    }
}
