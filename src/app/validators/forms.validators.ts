import { AbstractControl } from "@angular/forms";

export class FormsValidators{
    public static isDni(control: AbstractControl){
        if(control){
            return true;
        }else{
            return null;
        }
    }
}