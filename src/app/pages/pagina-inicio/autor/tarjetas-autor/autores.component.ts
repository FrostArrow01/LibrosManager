import { Component, Input, OnInit } from '@angular/core';
import { Autor } from 'src/app/models/autor';
import { AutorService } from 'src/app/services/autor.service';
import { LibroService } from 'src/app/services/libro.service';
import { Libro } from 'src/app/models/libro';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.scss']
})
export class AutoresComponent implements OnInit {
  
  isEnabled: Boolean= true;
  listAutores: any;
  formularioAct: boolean;
  autorMandar: Autor;
  listLibrosAut: Libro[];
  filterPost: string;
  
  constructor(private autorService: AutorService, private libroService: LibroService) { 
    this.filterPost = '';
    this.listAutores = [];
    this.listLibrosAut = [];
    this.formularioAct = false;
    this.autorMandar = {
      dni: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      telefono: '',
      email: ''
    }   
    
  }

  ngOnInit(): void {
    this.autorService.getAutor().subscribe(result =>{ 
      if (result.success){
        this.listAutores = result.message;
      } else{
        let error = result.error;
        console.log("Error al recoger los autores", error);
      }
    });
  }

 

  onclickAdd(): void {
    
   if (this.formularioAct!=true){
    this.formularioAct=true;
    if(this.autorMandar.dni!=""){
      this.isEnabled=true;
    }
   }else{
    this.formularioAct=false;
   }
  }


  borrarAutor(autor: Autor): void{
    this.libroService.getLibrobyAutor(autor.dni).subscribe(result =>{ 
        this.listLibrosAut = result.message;

        var mensaje = this.listLibrosAut
        ? "¿Estás seguro de que quieres borrar el autor: \n'"+autor.nombre+" "+autor.apellido1+" " +"'? Esto borrara "+ this.listLibrosAut.length+ " libro(s) de este autor." 
        : "¿Estás seguro de que quieres borrar el autor: \n'"+autor.nombre +" "+ autor.apellido1+"'?";

        if(confirm(mensaje)){
          this.autorService.deleteAutor(autor.dni).subscribe(result =>{
          if(result.success){
            window.location.reload();
          }else{
            window.alert(result.error);
          }
        });
        }
         
    });
  }

}
