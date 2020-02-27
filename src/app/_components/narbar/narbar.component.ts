import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../_services/messages.service';

@Component({
    selector: 'app-narbar',
    templateUrl: './narbar.component.html',
    styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {

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
