import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../_services/api.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';
import {ApiHttpMethod} from '../../../_enum/api-http-method.enum';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public hide = false;


  constructor(private apiService: ApiService, private httpClient: HttpClient, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {


  }

  testSyncrone() {
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();
    this.apiService.invoke('https://jsonplaceholder.typicode.com/todos/1', ApiHttpMethod.GET, '', '').subscribe();


  }

  testAsynchrome() {
    /*this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe();*/

  }

  hideClick() {
    this.hide = true;
  }

  testLogin() {
    this.httpClient.post('http://192.168.244.27:8080/api/login', {login: 'ppetit', password: 'tutu'}, {observe: 'response'})
      .subscribe(
        result => {
          console.log(result);
          console.log(result.headers.keys());
        }
      );
  }

  testRequetteavectoken() {
    this.apiService.invoke('http://192.168.244.27:8080/private', ApiHttpMethod.GET, null, null)
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }
}
