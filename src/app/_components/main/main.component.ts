import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/_services/authentication.service';
import {Router} from '@angular/router';
import {MessagesService} from 'src/app/_services/messages.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router, private messageService: MessagesService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .subscribe(value => {
        this.messageService.addSuccessMessage('Déconnexion', 'Déconnexion réussie');
        this.router.navigate(['/']);
      });

  }

}
