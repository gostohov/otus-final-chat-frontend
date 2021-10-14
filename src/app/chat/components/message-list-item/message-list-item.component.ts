import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
    selector: 'app-message-list-item',
    templateUrl: './message-list-item.component.html',
    styleUrls: ['./message-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListItemComponent implements OnInit {
    @Input() belongsToUser: boolean;

    message = 'Est altus sensorem, cesaris. When one realizes meditation and harmony, one is able to meet volume. White bread tastes best with lemon juice and lots of jasmine.';

    constructor() {
    }

    ngOnInit(): void {
    }

}
