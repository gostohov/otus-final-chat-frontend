import {Injectable} from '@angular/core';
import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import {UserService} from '../_services/user.service';

@Injectable({
    providedIn: 'root'
})
export class RxStompConfigService {

    constructor(private userService: UserService) {
    }

    getRxStompConfig(): InjectableRxStompConfig {
        return {
            brokerURL: `ws://localhost:8081/ws`,
            connectHeaders: {
                Authorization: `Bearer ${this.userService.token}`
            },
            heartbeatIncoming: 0,
            heartbeatOutgoing: 20000,
            reconnectDelay: 5000,
            debug: (msg: string): void => {
                console.log(new Date(), msg);
            },
        }
    }
}
