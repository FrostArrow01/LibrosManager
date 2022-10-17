import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Autor } from 'src/app/models/autor';
import { Libro } from 'src/app/models/libro';
import { AutorService } from 'src/app/services/autor.service';
import { LibroService } from 'src/app/services/libro.service';
import { Location } from '@angular/common';




@Component({
  selector: 'app-list-libro-autor',
  templateUrl: './list-libro-autor.component.html',
  styleUrls: ['./list-libro-autor.component.scss']
})
export class ListLibroAutorComponent implements OnInit {
  listLibrosAut: Libro[];
  autorDni: string;
  autor: Autor;

  constructor(private location: Location, private libroService: LibroService, private autorService: AutorService, private activatedRoute: ActivatedRoute) { 

    this.listLibrosAut = [];
    this.autorDni = '';
    this.autor = {
      dni: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      telefono: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parameters: any) => { 
      this.autorDni = parameters.get('dniAutor');
    }, error =>{ //que devuelve si hay error
      console.log('No hay id en la ruta o ha fallado', error)
    }, () =>{ //para hacer algo tras la ejecucion
      
    });

    this.cargarLibrosAutor(this.autorDni);
    this.getAutor(this.autorDni);
        
  }

  volver(): void{
    this.location.back();
  }

 
  cargarLibrosAutor(autorDni: string): void{
    this.libroService.getLibrobyAutor(autorDni).subscribe(result =>{  //recogemos todos los autores
      if(result.success){
        this.listLibrosAut = result.message;
      }else{
        console.log("Error al recoger los libros de este autor", result.error);
      }
    });
  }

  getAutor(autorDni: string){
    this.autorService.getAutorById(autorDni).subscribe(result =>{  //recogemos todos los autores
      if (result.success){
        this.autor = result.message;
      } else{
        let error = result.error;
        console.log("Error al encontrar el autor por dni", error);
      }
    });
  }

  back(){
    this.location.back();
  }
  
}
