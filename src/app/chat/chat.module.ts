import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {SidebarList} from './components/sidebar-list/sidebar-list.component';
import {SidebarListItemComponent} from './components/sidebar-list-item/sidebar-list-item.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {MessageListComponent} from './components/message-list/message-list.component';
import {FooterComponent} from './components/footer/footer.component';
import {MessageListItemComponent} from './components/message-list-item/message-list-item.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ChatRoutingModule} from './chat-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {UserService} from '../_services/user.service';
import {RxStompConfigService} from '../_config/rx-stomp-config.service';
import {SharedModule} from '../_shared/shared.module';
import {AvatarModule} from 'primeng/avatar';
import {ChatroomListProviderService} from './services/chatroom-list-provider.service';
import {InstantMessageProviderService} from './services/instant-message-provider.service';


@NgModule({
    declarations: [
        ChatComponent,

        SidebarList,
        SidebarListItemComponent,
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
            useFactory: (authService: UserService) => new RxStompConfigService(authService).getRxStompConfig(),
            deps: [UserService]
        },
        {
            provide: RxStompService,
            useFactory: rxStompServiceFactory,
            deps: [InjectableRxStompConfig],
        },
        ChatroomListProviderService,
        InstantMessageProviderService
    ]
})
export class ChatModule {
}
