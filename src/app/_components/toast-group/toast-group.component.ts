import {Component, OnInit} from '@angular/core';
import {MessagesService} from 'src/app/_services/messages.service';
import {NavigationStart, Router} from '@angular/router';
import {Message} from 'src/app/message';

@Component({
  selector: 'app-toast-group',
  templateUrl: './toast-group.component.html',
  styleUrls: ['./toast-group.component.css']
})
export class ToastGroupComponent implements OnInit {

  messages: Message[];

  constructor(private messageService: MessagesService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showToasts();
      }
    });
  }


  ngOnInit() {
    //this.showToasts();
    this.messages = [];
  }

  showToasts() {
    console.log('Show Toasts');

    this.messageService.getMessages().subscribe((messages) => {
      console.log(messages);

      this.messages = messages;

      setTimeout(function() {
        (<any> $('.toast')).toast('show');
      }, 500);

    });

  }

}
