import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../_services/messages.service';
import {CategoriesService} from '../../_services/categories.service';
import {CategoryModel} from '../../_models/categoryModel';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public categories: CategoryModel[] = [];

    constructor(public authService: AuthenticationService,
                private router: Router,
                private messageService: MessagesService,
                private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.categoriesService.getAllCategories().subscribe(
            (value: HttpResponse<any>) => {
                // console.log(value);
                this.categories = value.body.categories;
            }
        );
    }

    logout() {
        this.authService.logout()
            .subscribe(value => {
                this.messageService.addSuccessMessage('Déconnexion', 'Déconnexion réussie');
                this.router.navigate(['/']);
            });

    }


    encodeURI(name: string) {
        return encodeURI(name);
    }
}