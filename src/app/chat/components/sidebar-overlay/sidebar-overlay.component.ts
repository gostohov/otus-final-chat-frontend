import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrentUser} from '../../../_models/user/currentUser';
import {UserService} from '../../../_services/user.service';

@Component({
    selector: 'app-sidebar-overlay',
    templateUrl: './sidebar-overlay.component.html',
    styleUrls: ['./sidebar-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarOverlayComponent implements OnInit {
    @Input() displaySidebarOverlay: boolean;
    @Output() displaySidebarOverlayChange = new EventEmitter<boolean>();

    currentUser: CurrentUser;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.currentUser = this.userService.currentUser;
    }

    signOut(): void {
        this.userService.signOut();
    }

    displaySidebarOverlayChangeEmit(status: boolean) {
        this.displaySidebarOverlayChange.emit(status);
    }
}
