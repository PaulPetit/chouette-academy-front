import {Component, OnInit} from '@angular/core';
import {MessagesService} from 'src/app/_services/messages.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private messageService: MessagesService) {
  }

  ngOnInit() {
  }


}
