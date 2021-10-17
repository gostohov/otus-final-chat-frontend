import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {User} from '../../../_models/user';

@Component({
    selector: 'app-sidebar-list',
    templateUrl: './sidebar-list.component.html',
    styleUrls: ['./sidebar-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarList implements OnInit {
    @Input() dataList: User[];

    NO_USERS_FOUND = 'No users found';

    constructor() {
    }

    ngOnInit(): void {
    }

}
