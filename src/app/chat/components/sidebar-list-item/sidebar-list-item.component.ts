import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {User} from '../../../_models/user';

@Component({
    selector: 'app-sidebar-list-item',
    templateUrl: './sidebar-list-item.component.html',
    styleUrls: ['./sidebar-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarListItemComponent {
    @Input() contact: User;
}
