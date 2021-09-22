import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {FooterComponent} from './footer/footer.component';
import {MessageListComponent} from './message-list/message-list.component';
import {TopBarComponent} from './top-bar/top-bar.component';


@NgModule({
    declarations: [
        ChatComponent,
        TopBarComponent,
        MessageListComponent,
        FooterComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ChatComponent
    ]
})
export class ChatModule {
}
