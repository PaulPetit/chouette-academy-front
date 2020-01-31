import {Component, OnInit} from '@angular/core';
import {ApiHttpMethod, ApiService} from '../../../_services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public hide = false;


  constructor(private apiService: ApiService, private httpClient: HttpClient) {
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
}
