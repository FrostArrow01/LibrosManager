import { Component, Input, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-boton-mas',
  templateUrl: './boton-mas.component.html',
  styleUrls: ['./boton-mas.component.scss']
})
export class BotonMasComponent implements OnInit {
  @Input() item = '';
  listLibrosAut: Libro[];

  constructor(private libroService: LibroService) {
    this.listLibrosAut = [];
   }

  ngOnInit(): void {
    this.libroService.getLibrobyAutor(this.item).subscribe(result =>{
      if(result.success){
        this.listLibrosAut = result.message;
      }else{
        console.log("El autor no tiene libros")
      }
    });
  }

}
