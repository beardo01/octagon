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
    headers.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    headers.append('client_key', 'Ym2fv0ZxMyJrnCiwmNDi');
    headers.append('Content-Type', 'application/json');

    let body = {
      "colour_one": colourArr[0],
      "colour_two": colourArr[1],
      "colour_three": colourArr[2],
    };
    console.log('data sent in body setColours()', JSON.stringify(body));
   return this.http.post('https://api.simpalapps.com/driver/set/colours', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }
    setLabels(labelArr) {
    // post to server and set new colour strings
    let headers: Headers =  new Headers();
    headers.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    headers.append('client_key', 'Ym2fv0ZxMyJrnCiwmNDi');
    headers.append('Content-Type', 'application/json');

    let body = {
      "label_one": labelArr.label1,
      "label_two": labelArr.label2,
      "label_three": labelArr.label3
    };
    console.log('data sent in body setLabels()', JSON.stringify(body));
   return this.http.post('https://api.simpalapps.com/driver/set/labels', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }
} // end class
