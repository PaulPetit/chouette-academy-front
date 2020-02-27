import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChatService} from '../../_services/chat.service';
import {ApiChatMessage} from '../../_class/apiChatMessage.class';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {

    private readonly MAX_MESSAGES = 100;
    private readonly REFRESH_INTERVAL = 2000;
    public messages: Array<{ username: string, message: string }> = [];
    private scrollContainer: any;

    private counter: number = 0;
    private isNearBottom: boolean = true;

    private startTime = this.getTimestamp();
    private endTime = this.getTimestamp();

    private chatId = 1;
    private interval: any;

    constructor(private chatService: ChatService) {
    }

    @ViewChild('scrollFrame', {static: false}) scrollFrame: ElementRef;
    @ViewChildren('item') itemElements: QueryList<any>;

    ngAfterViewInit() {
        this.scrollContainer = this.scrollFrame.nativeElement;
        this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());

        this.interval = setInterval(() => {
            // test time stamp
            this.startTime = this.endTime;
            this.endTime = this.getTimestamp();
            // console.log('On récupère les messages entre ' + this.startTime + ' et ' + this.endTime);
            // console.log(this.endTime - this.startTime);

            this.chatService.getMessages(this.chatId, this.startTime, this.endTime);
            // limite à MAX_MESSAGES messages
            if (this.messages.length >= this.MAX_MESSAGES) {
                this.messages.shift();
            }
            this.messages.push({
                username: 'Test' + this.counter,
                message: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            });
            this.counter++;
            // console.log(this.messages.length);
        }, this.REFRESH_INTERVAL);
    }

    private getTimestamp() {
        return Math.floor(Date.now() / 1000);
    }

    private onItemElementsChanged(): void {
        if (this.isNearBottom) {
            this.scrollToBottom();
        }
    }

    private scrollToBottom(): void {
        this.scrollContainer.scroll({
            top: this.scrollContainer.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    private isUserNearBottom(): boolean {
        const threshold = 10;
        const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
        const height = this.scrollContainer.scrollHeight;
        return position > height - threshold;
    }

    ngOnInit() {

    }

    /*  updateScroll() {

        const element = document.getElementById('chat-messages-container');

        const isScrolledToBottom = element.scrollHeight - element.clientHeight <= element.scrollTop + 1;
        console.log(isScrolledToBottom);
        if (isScrolledToBottom) {
          element.scrollTop = element.scrollHeight;
        }

      }*/


    scrolled(event: any): void {
        // console.log('scrolled');
        this.isNearBottom = this.isUserNearBottom();
    }

    sendMessage(messageContent: string) {

        const messageToSend: ApiChatMessage = {
            chatId: this.chatId.toString(),
            content: messageContent
        };

        this.chatService.sendMessage(messageToSend);
    }

    ngOnDestroy(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
