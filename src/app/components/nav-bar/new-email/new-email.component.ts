import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Email } from 'src/app/models/email';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.scss']
})
export class NewEmailComponent implements OnInit {
  emailForm : FormGroup;
  file: File | null = null; 
  enableArchivo: Boolean;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.enableArchivo = false

    this.emailForm = this.fb.group({
      to: [null, []],
      subject: [null, []],
      text: [null, []],
      file: [null, []]       
    });
   }

  ngOnInit(): void {
    
  }

  habilitarArch(){
    this.enableArchivo = !this.enableArchivo;
  }


  volver(){
    window.location.reload();
  }

  guardarEmail(){
    const email = this.emailForm.getRawValue() as Email;
    window.alert(email.file);
    
    if(this.enableArchivo){
      this.emailService.sendEmailArgs(email).subscribe((result) =>{
        window.alert("El email con asunto: '"+email.subject+ "' ha sido enviado a '"+email.to+"' con éxito.");
        window.location.reload()
      });

    }else{
      this.emailService.sendEmail(email).subscribe((result) =>{
        window.alert("El email con asunto: '"+email.subject+ "' ha sido enviado a '"+email.to+"' con éxito.");
        window.location.reload()
      });
    }

  }

}
