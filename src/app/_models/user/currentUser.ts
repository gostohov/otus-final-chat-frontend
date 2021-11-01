import {User} from './user';
import {ChatRoom} from '../chatroom/chatRoom';

export class CurrentUser extends User {
    chatRooms: ChatRoom[];
}
