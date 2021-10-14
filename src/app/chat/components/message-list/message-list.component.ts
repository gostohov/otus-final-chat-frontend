import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
