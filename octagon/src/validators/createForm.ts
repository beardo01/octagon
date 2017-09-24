import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

export class CreateFormValidator {
 

    static validLabel(control: FormControl): any {
        if(control.value === null){
            return {
                "not a valid label": false
            }
        }
        return null;
    }

    static validEndTime(group: FormGroup) {
        var formattedStart: string = group.value.dateStarts + " " + group.value.timeStarts;
        var formattedEnd: string = group.value.dateEnds + " " + group.value.timeEnds;
        var timeS: number = moment(formattedStart).unix();
        var timeE: number = moment(formattedEnd).unix();
        if (timeE - timeS < 0) {
            return {
                "invalid time": false
            }
        }
        return null;
    }

    isValid(control: FormControl) {
        if (control.value) {
            return null;
        } else {
            return "Could not authenticate user";
        }
    }
    
    // static isValid(control: FormControl): any {
        
    //     if(isNaN(control.value)){
    //         return {
    //             "not a number": true
    //         };
    //     }
    //     if(control.value % 1 !== 0){
    //         return {
    //             "not a whole number": true
    //         };
    //     }
    //     if(control.value < 18){
    //         return {
    //             "too young": true
    //         };
    //     }
    //     if (control.value > 120){
    //         return {
    //             "not realistic": true
    //         };
    //     }
    //     return null;
    // }
 
}