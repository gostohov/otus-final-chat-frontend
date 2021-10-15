import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {User} from '../../../_models/user';

@Component({
    selector: 'app-contact-list-item',
    templateUrl: './contact-list-item.component.html',
    styleUrls: ['./contact-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListItemComponent {
    @Input() contact: User;
}
