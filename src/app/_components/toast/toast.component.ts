import {Component, Input, OnInit} from '@angular/core';
import {MessageType} from '../../_enum/message-type.enum';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    @Input() title: string = 'Toast';
    @Input() content: string = 'Contenu par défaut';
    @Input() type: MessageType = MessageType.Info;

    constructor() {
    }

    ngOnInit() {
    }


    get messageType() {
        switch (+this.type) { // Sans le + on passe toujours dans la case default, bug de TypeScript ?
            case MessageType.Error:
                return 'toast-error';
            case MessageType.Info:
                return 'toast-info';
            case MessageType.Success:
                return 'toast-success';
            default:
                return '';
        }
    }


}
