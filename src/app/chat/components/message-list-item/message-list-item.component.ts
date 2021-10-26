import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {InstantMessage} from '../../../_models/instantMessage/instantMessage';

@Component({
    selector: 'app-message-list-item',
    templateUrl: './message-list-item.component.html',
    styleUrls: ['./message-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListItemComponent {
    @Input() belongsToUser: boolean;
    @Input() instantMessage: InstantMessage;
}
