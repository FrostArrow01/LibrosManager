import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VirtualAction } from 'rxjs';
import { Autor } from 'src/app/models/autor';
import { AutorService } from 'src/app/services/autor.service';
import { FormsValidators } from 'src/app/validators/forms.validators';

@Component({
  selector: 'app-formulario-add',
  templateUrl: './formulario-add.component.html',
  styleUrls: ['./formulario-add.component.scss']
})
export class FormularioAddComponent implements OnInit {
  autorForm : FormGroup;
  autor: Autor;
  dniAutor: string;
  msgError: string;
  msgExito: string;
  adding: boolean;
  listAutores: Autor[];
  isnotEnabled: boolean;
  
  
  
  constructor(private fb: FormBuilder, private autorService: AutorService, 
    private activatedRoute: ActivatedRoute, private router: Router
    ) 
    {
      this.listAutores = [];
      this.msgError='';
      this.msgExito='';
      this.dniAutor = '';
      this.adding = false;
      this.isnotEnabled = false;
     
      this.autorForm = this.fb.group({
        dni: [null, []],
        nombre: [null, []],
        apellido1: [null, []],
        apellido2: [null, []],
        telefono: [null, []],
        email: [null, []]
      });

      this.autor = {
        dni: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        telefono: '',
        email: ''
      }   
   }


  ngOnInit(): void {
    
    
    this.autorService.getAutor().subscribe(result => {
      if (result.success){
        this.listAutores = result.message;
      } else{
        let error = result.error;
        console.log("Error al encontrar el autor por dni", error);
      }
    });
    
    //Recogemos el dni de la ruta
    this.activatedRoute.paramMap.subscribe((parameters: any) => { 
      this.dniAutor = parameters.get('dniAutor');


    }, error =>{ //que devuelve si hay error
      console.log('No hay dni en la ruta o ha fallado', error)
    }, () =>{ //para hacer algo tras la ejecucion
  
    });
    
    if(this.dniAutor==null){ //si no hay dni en la ruta significa que se esta añadiendo uno nuevo
      this.adding=true;
    }else{
      this.adding=false;
        //Recogemos el autor con ese dni
      this.autorService.getAutorById(this.dniAutor).subscribe(result => {
        if (result.success){
          this.autor = result.message;
        } else{
          let error = result.error;
          console.log("Error al encontrar el autor por dni", error);
          this.adding = true;
        }
        
      }, error =>{ //que devuelve si hay error
        console.log("Error al encontrar el autor por dni", error);
        this.adding = true;
        
      }, () =>{ //para hacer algo tras la ejecucion
        //Deshabilitamos la edicion del dni en caso de estar editando un autor existente
        const autor = this.autorForm.getRawValue() as Autor;
        this.buildAutorForm();
        if(autor.dni != ''){
          this.autorForm.get('dni')?.disable();
        }
      });
    }

    
    
  }

  
  

//Construye el formulario por defecto con los datos del autor con el dni en la ruta
  buildAutorForm(){
    this.autorForm = this.fb.group({
      dni: [this.autor.dni ? this.autor.dni : '', Validators.required], //[FormsValidators.isDni]],
      nombre: [this.autor.nombre ? this.autor.nombre : '', []],
      apellido1: [this.autor.apellido1 ? this.autor.apellido1 : '', []],
      apellido2: [this.autor.apellido2 ? this.autor.apellido2 : '', []],
      telefono: [this.autor.telefono ? this.autor.telefono : '', []],
      email: [this.autor.email ? this.autor.email : '', []]
    });
    
  }

  
//Guardar un nuevo autor, o editar uno existente
  guardarAutor(): void{
    if(!this.autorForm.valid){
      Object.keys(this.autorForm.controls).forEach(element => { //validaciones del formulario
            if(element=='dni'){ //comprobacion del dni
              let errorDni=this.autorForm.get('dni')?.errors;
              if(errorDni){
                  this.msgError='Error dni vacío';
                }
              }
          
          });
    }else{

      const autor = this.autorForm.getRawValue() as Autor;
    
    if(autor.dni != null && autor.dni != ''){
      this.autorService.updateAutor(autor, autor.dni).subscribe(result =>{ 
        if(result.success){
          window.alert("El autor se ha guardado con éxito");
          this.router.navigate(['/inicio/autor']);
        }else{
          console.log(result.error);
          window.alert(result.error);
        }
        
      });
    }else{
      this.msgError="El dni no puede estar vacio";
    }
  }
  }


//Evento que señala que el dni no puede estar vacio
keyPress(event: KeyboardEvent){
  const autor = this.autorForm.getRawValue() as Autor;
  let presente = false;
  this.msgError='';
  this.isnotEnabled=false;

  if(this.adding == true){
    this.listAutores.forEach(element => {
      if(presente){
        return;
      }
      if(autor.dni==element.dni){
        presente = true;
        this.msgError="Dni repetido";
        this.isnotEnabled=true;
      }
    });
  }

}
}
