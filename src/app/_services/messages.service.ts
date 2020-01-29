import { Injectable } from '@angular/core';
import { Message, MessageType } from '../message';
import { Router, NavigationStart } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages: Array<Message> = [];



  constructor(private router: Router) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this.messages = [];
    //   }
    // });
  }



  public addMessage(messageTitle: String, messageContent: String, messageType: MessageType = MessageType.Info) {
    this.messages.push({ content: messageContent, type: messageType, title: messageTitle });
  }

  public addErrorMessage(messageTitle: String, messageContent: String){
    this.addMessage(messageTitle, messageContent, MessageType.Error)
  }

  public addInfoMessage(messageTitle: String, messageContent: String){
    this.addMessage(messageTitle, messageContent, MessageType.Info)
  }

  public addSuccessMessage(messageTitle: String, messageContent: String){
    this.addMessage(messageTitle, messageContent, MessageType.Success)
  }


  public getMessages(): Observable<Message[]> {
    let messagesToSend = Array.from(this.messages);
    this.messages = [];
    return of(messagesToSend);

    //     let m1:Message = {
    //       content: "Coucou",
    //       title: "titreeeee",
    //       type: MessageType.Info
    //   }

    //   let m2:Message = {
    //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue tincidunt augue sit amet vulputate. Donec tempus gravida tortor non dapibus. Nulla justo arcu, tempus id ex et, tempus ultricies nisi. In lacinia rhoncus justo luctus placerat. Nam molestie urna et dictum sodales. Vivamus lacinia volutpat nisl sit amet cursus. Nullam vitae lectus elementum, laoreet orci volutpat, congue enim. Proin volutpat sagittis purus, scelerisque auctor arcu pretium ullamcorper. Vestibulum vel lacus vitae leo scelerisque fermentum in eleifend ipsum. ",
    //     title: "titreeeee ",
    //     type: MessageType.Error
    // }

    //     return of([m1,m2])

  }

}
