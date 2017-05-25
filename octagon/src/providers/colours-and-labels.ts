import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ColoursAndLabels {

  // datafield holding colour string
  colours: string[] = [];
  // datafield holding label strings
  labels: string [] = [];

  constructor(public http: Http) {
  
  }

  requestColoursAndLabels() {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers();
    myHeaders.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    myHeaders.append('Content-Type', 'application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })  
    // Make get request to API and get current values for colour strings
    return this.http.get('http://104.197.40.106/api/driver/get/colours', opt).map(res => res.json().message).subscribe(
    data => {
      console.log("Data recieved from requestColours:")
      console.log(data)
      this.colours.push(data.colours.colour_one);
      this.colours.push(data.colours.colour_two);
      this.colours.push(data.colours.colour_three);
      this.labels.push(data.labels.label_one);
      this.labels.push(data.labels.label_two);
      this.labels.push(data.labels.label_three);
    },
    err => {
      console.log("Error from getColours on colours-and-labels.ts")
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
    console.log(JSON.stringify(body));
    this.http.post('http://104.197.40.106/api/driver/', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }
} // end class
