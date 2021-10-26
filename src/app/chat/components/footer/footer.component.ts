import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UntilDestroy} from '@ngneat/until-destroy';
import {UserService} from '../../../_services/user.service';
import {ChatRoomService} from '../../../_services/chatroom.service';
import {InstantMessage} from '../../../_models/instantMessage/instantMessage';
import {ChatRoom} from '../../../_models/chatroom/chatRoom';
import {User} from '../../../_models/user/user';

@UntilDestroy()
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
    messageInput: string;

    @ViewChild('inputField') inputField: ElementRef;

    constructor(private userService: UserService,
                private chatRoomService: ChatRoomService) {
    }

    ngOnInit() {
    }

    sendMessage(): void {
        const instantMessage = new InstantMessage(
            this.chatRoomService.selectedChatRoom?.id,
            this.userService.currentUser.username,
            this.userService.selectedUser?.username,
            this.messageInput
        );
        this.chatRoomService.sendInstantMessage(instantMessage);
        this._clearInputField();
    }

    appendInputContent({target}: any): void {
        this.messageInput = target.innerText;
    }

    private _clearInputField(): void {
        this.inputField.nativeElement.innerText = '';
        this.messageInput = undefined;
    }
}
