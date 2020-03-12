import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateCA'
})
export class DateCAPipe implements PipeTransform {

    transform(timeStamp: number): string {

        const timeZoneOffset = new Date().getTimezoneOffset();
        const date = new Date(timeStamp * 1000);

        const h = date.getUTCHours() - Math.floor(timeZoneOffset / 60);
        const m = date.getUTCMinutes() - timeZoneOffset % 60;
        const jour = date.toISOString().substring(0, 10);

        const split = jour.split('-');

        const outputDate = date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth()+1).toString().padStart(2, '0') + '/' + date.getFullYear() + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');


        //return split[2] + '/' + split[1] + '/' + split[0] + " " + h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0');
        return outputDate;
    }

}
