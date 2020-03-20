import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateCA'
})
export class DateCAPipe implements PipeTransform {

    transform(timeStamp: number): string {

        if (timeStamp !== null) {

            const date = new Date(timeStamp * 1000);

            return date.getDate().toString().padStart(2, '0')
                + '/' +
                (date.getMonth() + 1).toString().padStart(2, '0')
                + '/' +
                date.getFullYear()
                + ' ' +
                date.getHours().toString().padStart(2, '0')
                + ':' +
                date.getMinutes().toString().padStart(2, '0');

        } else {
            return 'N/A';
        }

    }

}
