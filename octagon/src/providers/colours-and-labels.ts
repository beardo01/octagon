import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ColoursAndLabels {

  // datafield holding colour string
  colours: string[];
  // datafield holding label strings
  labels: string [];

  
  constructor(public http: Http) {
    this.colours = [];
    this.labels = [];
  }

  requestColoursAndLabels() {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers();
    myHeaders.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    myHeaders.append('client_key', 'Ym2fv0ZxMyJrnCiwmNDi');
    myHeaders.append('Content-Type', 'application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })  
    // Make get request to API and get current values for colour strings
    return this.http.get('https://api.simpalapps.com/driver/get/settings', opt).map(res => 
      {
      var data = res.json().data;
      this.colours[0] = data.colours.colour_one;
      this.colours[1] = data.colours.colour_two;
      this.colours[2] = data.colours.colour_three;

      this.labels[0] = data.labels.label_one;
      this.labels[1] = data.labels.label_two;
      this.labels[2] = data.labels.label_three;
      },
      error => {
        console.log(error)
      });
    }

  // Get values stored in colour array
  getColours() {
    return this.colours;
  }
  // Get values stored in label array
  getLabels() {
    return this.labels;
  }

  setColours(colourArr) {
    // post to server and set new colour strings
    let headers: Headers =  new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = {
      "colour1": colourArr[0],
      "colour2": colourArr[1],
      "colour3": colourArr[2],
      "auth_key": "9C73815A3C9AA677B379EB69BDF19"
    };
    //console.log(JSON.stringify(body));
    this.http.post('https://api.simpalapps.com/driver/get/settings', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }
} // end class
