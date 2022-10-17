import { Component, Input, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-list-libro-categoria',
  templateUrl: './list-libro-categoria.component.html',
  styleUrls: ['./list-libro-categoria.component.scss']
})
export class ListLibroCategoriaComponent implements OnInit {
  @Input() item = 0;
  listLibrosCat: Libro[];

  constructor(private libroService: LibroService) {
    this.listLibrosCat = [];
   }

  ngOnInit(): void {
    this.libroService.getLibrobyCategoria(this.item).subscribe(result =>{
      if(result.success){
        this.listLibrosCat = result.message;
      }else{
        console.log("Error al recoger los libros por autor", result.error);
      }
      
    })
  }
}


