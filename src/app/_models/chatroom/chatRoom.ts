import {User} from '../user/user';
import {ChatRoomType} from './chatRoomType';

export class ChatRoom {
    id: number;
    name: string;
    description: string;
    type: ChatRoomType;
    imageUrl: string;
    users: User[];
    lastTimeUpdated: Date;
}
