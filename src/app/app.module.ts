import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatTopBarComponent } from './components/chat-top-bar/chat-top-bar.component';
import { ChatMessageListComponent } from './components/chat-message-list/chat-message-list.component';
import { ChatFooterComponent } from './components/chat-footer/chat-footer.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ChatComponent,
        ChatTopBarComponent,
        ChatMessageListComponent,
        ChatFooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
