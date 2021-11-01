import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {InstantMessage} from '../../../_models/instantMessage/instantMessage';
import {UserService} from '../../../_services/user.service';
import {CurrentUser} from '../../../_models/user/currentUser';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable} from 'rxjs';
import {ChatRoomService} from '../../../_services/chatroom.service';
import {tap} from 'rxjs/operators';

@UntilDestroy()
@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnInit, AfterViewInit {
    @Input() instantMessages: InstantMessage[];

    @ViewChild('container') container: ElementRef;
    @ViewChildren('messageItem', { read: ElementRef }) messageItemQueryList: QueryList<ElementRef>;

    currentUser: CurrentUser;
    messageAuthorFullNameMap = {};

    constructor(private userService: UserService,
                private chatRoomService: ChatRoomService) {
    }

    ngOnInit() {
        this.currentUser = this.userService.currentUser;
        this._fillMessageAuthorFullNameMap().subscribe();
    }

    ngAfterViewInit() {
        this._scrollToLastItem();
        this.messageItemQueryList.changes
            .pipe(untilDestroyed(this))
            .subscribe(() => this._scrollToLastItem());
    }

    trackInstantMessageList(index: number, instantMessage: InstantMessage) {
        return instantMessage.date;
    }

    private _scrollToLastItem(): void {
        const lastItem = this.messageItemQueryList.get(this.messageItemQueryList.length - 1);
        if (!lastItem) {
            return;
        }

        lastItem?.nativeElement?.scrollIntoView();
    }

    private _fillMessageAuthorFullNameMap(): Observable<any> {
        return this.chatRoomService.selectedChatRoomObs$.pipe(
            untilDestroyed(this),
            tap(({users}) => users.forEach(({username, firstName, lastName}) =>
                this.messageAuthorFullNameMap[username] = `${firstName} ${lastName}`))
        )
    }
}
