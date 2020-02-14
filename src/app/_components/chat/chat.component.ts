import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  messages: Array<{ username: string, message: string }> = [];

  constructor() {
  }

  @ViewChildren('chatMessage') things: QueryList<any>;

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.updateScroll();
    });
  }

  ngOnInit() {
    setInterval(() => {
      // limite à 100 messages
      if (this.messages.length > 100) {
        this.messages.shift();
      }
      this.messages.push({
        username: 'Test',
        message: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      });
      console.log(this.messages.length);
    }, 500);
  }

  updateScroll() {
    const element = document.getElementById('chat-messages-container');
    element.scrollTop = element.scrollHeight;
  }

}
