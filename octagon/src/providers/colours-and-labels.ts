import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ColoursAndLabels {

  // datafield holding colour string
  colours: string[];
  // datafield holding label strings
  labels: string [];

  constructor(public http: Http) {
  
  }

  getColours() {
    // Make get request to API and get current values for colour strings
    this.http.get('http://104.197.40.106/api/test.php').map(res => res.json()).subscribe(data => {
      console.log(data);
    })
  }

  getLabels(labelArr) {
    // Make get request to API and get current values for label strings
  }

  setColours(colourArr) {
    // post to server and set new colour strings
    let headers =  new Headers();
    headers.append('Content-Type', 'application/json');

    let body = {
      message: colourArr[0] + " " + colourArr[1] + " " + colourArr[2],
      auth_key: "9C73815A3C9AA677B379EB69BDF19"
    };
    this.http.post('http://104.197.40.106/api/driver.php', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

  setLabels(labelArr) {
    // post to server and set new label strings
  }

}
