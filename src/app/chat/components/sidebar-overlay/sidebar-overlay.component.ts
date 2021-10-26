import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import {CurrentUser} from '../../../_models/user/currentUser';
import {UserService} from '../../../_services/user.service';
import {RxStompService} from '@stomp/ng2-stompjs';

@Component({
    selector: 'app-sidebar-overlay',
    templateUrl: './sidebar-overlay.component.html',
    styleUrls: ['./sidebar-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarOverlayComponent implements OnInit {
    @Input() displaySidebarOverlay: boolean;
    @Input() displayGroupChatCreator: boolean;
    @Output() displaySidebarOverlayChange = new EventEmitter<boolean>();
    @Output() displayGroupChatCreatorChange = new EventEmitter<boolean>();

    currentUser: CurrentUser;

    constructor(private userService: UserService,
                private rxStompService: RxStompService) {
    }

    ngOnInit(): void {
        this.currentUser = this.userService.currentUser;
    }

    signOut(): void {
        this.rxStompService.deactivate();
        this.userService.signOut();
    }

    displaySidebarOverlayChangeEmit(status: boolean) {
        this.displaySidebarOverlayChange.emit(status);
    }

    toggleDisplayGroupChatCreator(): void {
        this.displayGroupChatCreator = !this.displayGroupChatCreator;
        this.displayGroupChatCreatorChange.emit(this.displayGroupChatCreator);
    }
}
