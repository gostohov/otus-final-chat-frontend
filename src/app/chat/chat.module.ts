import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {ContactListComponent} from './components/contact-list/contact-list.component';
import {ContactListItemComponent} from './components/contact-list-item/contact-list-item.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {MessageListComponent} from './components/message-list/message-list.component';
import {FooterComponent} from './components/footer/footer.component';
import {MessageListItemComponent} from './components/message-list-item/message-list-item.component';
import {InputTextModule} from 'primeng/inputtext';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {ChatRoutingModule} from './chat-routing.module';


@NgModule({
    declarations: [
        ChatComponent,

        ContactListComponent,
        ContactListItemComponent,
        TopBarComponent,
        MessageListComponent,
        FooterComponent,
        MessageListItemComponent
    ],
    imports: [
        CommonModule,
        ChatRoutingModule,

        InputTextModule,
        AvatarModule,
        ButtonModule
    ]
})
export class ChatModule {
}
