import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-chat-top-bar',
    templateUrl: './chat-top-bar.component.html',
    styleUrls: ['./chat-top-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatTopBarComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
