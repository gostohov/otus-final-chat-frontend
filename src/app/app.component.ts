import {Component, OnInit} from '@angular/core';
import {RxStomp} from '@stomp/rx-stomp';
import {Observable} from 'rxjs';
import {map, pluck, switchMap} from 'rxjs/operators';

interface Message {
    chatRoomId: String;
    username: String;
    date: Date;
    fromUser: String;
    toUser: String;
    text: String;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    username: string;
    messageText: string;
    chatRoomId = "b27c5b09-8e17-4549-89e9-272609ce9108";
    rxStomp: RxStomp;
    messages: Message[] = [];

    ngOnInit() {
        const stompConfig = {
            // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
            brokerURL: "ws://localhost:8080/ws",

            // Keep it off for production, it can be quit verbose
            // Skip this key to disable
            debug: function (str) {
                console.log('STOMP: ' + str);
            },

            // If disconnected, it will retry after 200ms
            reconnectDelay: 200,
        };

        // Create an instance. The first RxStomp is the UMD module name and other is the class name
        this.rxStomp = new RxStomp();

        // You can set additional configuration here
        this.rxStomp.configure(stompConfig);

        // Attempt to connect
        this.rxStomp.activate();

        this.rxStomp.watch(`/chatroom/old.messages/${this.chatRoomId}`)
                    .subscribe(frame => this.messages.push(...JSON.parse(frame.body)));

        this.rxStomp.watch(`/topic/${this.chatRoomId}.public.messages`)
                    .subscribe(frame => this.messages.push(JSON.parse(frame.body)));
    }

    sendMessage(): void {
        const payLoad = {
            text: this.messageText,
            chatRoomId: this.chatRoomId,
            username: this.username
        };
        this.rxStomp.publish({destination: '/chatroom/send.message', body: JSON.stringify(payLoad)});
    }

}
