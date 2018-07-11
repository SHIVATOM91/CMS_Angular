import { AbstractControl, ValidationErrors } from "@angular/forms";

export class MenuValidator{
    check(control:AbstractControl): ValidationErrors | null{
        if(control.value==""){
            return { 'isValid': true };
        }
    }
}