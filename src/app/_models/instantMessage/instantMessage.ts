export class InstantMessage {
    chatRoomId: number;
    date: Date;
    authorUsername: string;
    recipientUsername: string;
    content: string;

    constructor(chatRoomId: number, authorUsername: string, recipientUsername: string, content: string) {
        this.chatRoomId = chatRoomId;
        this.authorUsername = authorUsername;
        this.content = content;
        this.recipientUsername = recipientUsername;
    }
}
