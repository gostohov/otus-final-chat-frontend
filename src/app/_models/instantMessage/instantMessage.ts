export class InstantMessage {
    chatRoomId: number;
    date: Date;
    authorUsername: string;
    recipientUsernameList: string[];
    content: string;

    constructor(chatRoomId: number, authorUsername: string, recipientUsernameList: string[], content: string) {
        this.chatRoomId = chatRoomId;
        this.authorUsername = authorUsername;
        this.content = content;
        this.recipientUsernameList = recipientUsernameList;
    }
}
