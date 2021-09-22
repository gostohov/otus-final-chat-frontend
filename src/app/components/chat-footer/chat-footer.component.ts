import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
