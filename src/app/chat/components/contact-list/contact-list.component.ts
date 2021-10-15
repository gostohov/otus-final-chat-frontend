import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {User} from '../../../_models/user';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {
    @Input() dataList: User[];

    NO_USERS_FOUND = 'No users found';

    constructor() {
    }

    ngOnInit(): void {
    }

}
