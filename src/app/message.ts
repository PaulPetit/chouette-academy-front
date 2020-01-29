export class Message{
    title : String;
    type : MessageType;
    content : String;
}


export enum MessageType {
    Info,
    Error,
    Success
}