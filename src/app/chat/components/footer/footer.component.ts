import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UntilDestroy} from '@ngneat/until-destroy';
import {UserService} from '../../../_services/user.service';
import {ChatRoomService} from '../../../_services/chatroom.service';
import {InstantMessage} from '../../../_models/instantMessage/instantMessage';
import {ChatRoomType} from '../../../_models/chatroom/chatRoomType';

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
            this._getUsernameList(),
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

    private _getUsernameList(): string[] {
        if (!this.chatRoomService.selectedChatRoom) {
            return [
                this.userService.selectedUser.username,
                this.userService.currentUser.username
            ];
        }

        return this.chatRoomService.selectedChatRoom.users.map(user => user.username);
    }
}
