import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
@Injectable()
export class FormatDate {

  transform(value, args) {
    var dateString = '';
    var pm: boolean = false;
    var hour = value.slice(0, 2);
    var min = value.slice(2, value.length);

    if( hour >= 12 ) {
      pm = true;
    }
    if( hour > 12 ) {
      hour = hour - 12;
    }

    dateString += this.pad(hour);
    dateString += (":" + min);

    if (pm) {
      dateString += "pm";
    } else {
      dateString += "am";
    }
    return dateString;

  }
  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
}
