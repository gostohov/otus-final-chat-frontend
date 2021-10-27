import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {InstantMessage} from '../../../_models/instantMessage/instantMessage';
import {environment} from '../../../../environments/environment';
import {ChatRoomService} from '../../../_services/chatroom.service';
import {ChatRoomType} from '../../../_models/chatroom/chatRoomType';

@Component({
    selector: 'app-message-list-item',
    templateUrl: './message-list-item.component.html',
    styleUrls: ['./message-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListItemComponent {
    @Input() belongsToUser: boolean;
    @Input() instantMessage: InstantMessage;
    @Input() messageAuthorFullName: string;

    get showAuthorMessageFullName(): boolean {
        return this.chatRoomService.selectedChatRoom.type === ChatRoomType.GROUP && this.messageAuthorFullName != null;
    };

    get imageUrl(): string {
        return `${environment.url}/user/image/profile/${this.instantMessage.authorUsername}`;
    }

    constructor(private chatRoomService: ChatRoomService) {
    }
}
