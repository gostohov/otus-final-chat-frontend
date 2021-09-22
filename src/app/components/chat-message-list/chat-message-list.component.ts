import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
