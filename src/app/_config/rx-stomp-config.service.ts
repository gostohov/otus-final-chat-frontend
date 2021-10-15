import {Injectable} from '@angular/core';
import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import {AuthService} from '../_services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RxStompConfigService {

    constructor(private authService: AuthService) {
    }

    getRxStompConfig(): InjectableRxStompConfig {
        return {
            brokerURL: `ws://localhost:8081/ws`,
            connectHeaders: {
                Authorization: `Bearer ${this.authService.token}`
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
