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
import {ButtonModule} from 'primeng/button';
import {ChatRoutingModule} from './chat-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {AuthService} from '../_services/auth.service';
import {RxStompConfigService} from '../_config/rx-stomp-config.service';
import {SharedModule} from '../_shared/shared.module';
import {AvatarModule} from 'primeng/avatar';


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
        FormsModule,
        ReactiveFormsModule,

        InputTextModule,
        ButtonModule,
        SharedModule,
        AvatarModule
    ],
    providers: [
        {
            provide: InjectableRxStompConfig,
            useFactory: (authService: AuthService) => new RxStompConfigService(authService).getRxStompConfig(),
            deps: [AuthService]
        },
        {
            provide: RxStompService,
            useFactory: rxStompServiceFactory,
            deps: [InjectableRxStompConfig],
        },
    ]
})
export class ChatModule {
}
