import { FormControl } from '@angular/forms';
 
export class CreateFormValidator {
 

    static validLabel(control: FormControl): any {
        if(control.value === null){
            return {
                "not a valid label": false
            }
        }
        return null;
    }
}