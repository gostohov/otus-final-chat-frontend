import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of, ReplaySubject, Subject} from 'rxjs';
import {User} from '../../../_models/user/user';
import {ChatroomListProviderService} from '../../services/chatroom-list-provider.service';
import {debounceTime, map, switchMap, take, tap} from 'rxjs/operators';
import {UserService} from '../../../_services/user.service';
import {FormControl} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'app-group-chat-creator',
    templateUrl: './group-chat-creator.component.html',
    styleUrls: ['./group-chat-creator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupChatCreatorComponent implements OnInit {
    @Input() display: boolean;
    @Output() displayChange = new EventEmitter<boolean>();

    users$: Observable<User[]>;
    selectedCities: any;

    constructor(private chatroomListProviderService: ChatroomListProviderService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.users$ = this.chatroomListProviderService.chatRoomListObs$.pipe(
            map(list => {
                const users = (list.map(cr => cr.users) as any)
                                   .flat()
                                   .filter(user => user.id !== this.userService.currentUser.id) as User[];

                return [...new Map(users.map(item => [item.id, item])).values()] as User[];
            })
        );
    }

    displayChangeEmit(status: boolean): void {
        this.displayChange.emit(status);
    }

    closeCreator() {
        this.display = false;
        this.displayChange.emit(false);
    }

    createGroupChat() {

    }
}
