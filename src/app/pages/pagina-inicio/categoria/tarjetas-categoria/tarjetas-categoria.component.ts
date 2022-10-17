import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Libro } from 'src/app/models/libro';
import { CategoriaService } from 'src/app/services/categoria.service';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-tarjetas-categoria',
  templateUrl: './tarjetas-categoria.component.html',
  styleUrls: ['./tarjetas-categoria.component.scss']
})
export class TarjetasCategoriaComponent implements OnInit {

  isEnabled: Boolean= true;
  listCategorias: Categoria[];
  formularioAct: boolean;
  categoriaMandar: Categoria;
  listLibrosCat: Libro[];
  
  constructor(private categoriaService: CategoriaService, private libroService: LibroService) { 
    this.listCategorias = [];
    this.listLibrosCat = [];
    this.formularioAct = false;
    this.categoriaMandar = {
      id: 0,
      descripcion: ''
    }   
    
  }

  ngOnInit(): void {
    this.categoriaService.getCategoria().subscribe(result =>{ 
      if (result.success){
        this.listCategorias = result.message;
      } else{
        let error = result.error;
        console.log("Error al recoger las categorias", error);
      }
    });
  }

  onclickAdd(): void {
    
   if (this.formularioAct!=true){
    this.formularioAct=true;
    if(this.categoriaMandar.id!=null){
      this.isEnabled=true;
    }
   }else{
    this.formularioAct=false;
   }
  }

  borrarCategoria(categoria: Categoria): void{
    
    this.libroService.getLibrobyCategoria(categoria.id).subscribe(result =>{ 
      if(result.success){
        this.listLibrosCat = result.message;

        var mensaje = this.listLibrosCat.length>0 
        ? "¿Estás seguro de que quieres borrar la categoría: \n'"+categoria.id+". " + categoria.descripcion+"'? Esto borrara "+ this.listLibrosCat.length+ " libro(s) con esta categoría." 
        : "¿Estás seguro de que quieres borrar la categoría: \n'"+categoria.id+". " + categoria.descripcion+"'?";
   
        if(confirm(mensaje)){
          if(result.success){
            this.categoriaService.deleteCategoria(categoria.id).subscribe(result =>{
              if(result.success){
                window.alert("Se ha borrado la categoría con exito")
                window.location.reload();
              }else{
                console.log("Error al borrar la categoria");
              }
          });
          }
        }
           
      }else{
        console.log("Error al encontrar los libros por categoria");
      }
      
    });
  }

  editarCategoria(categoria: Categoria): void{
    this.formularioAct=true;
    this.categoriaMandar = categoria;
  }

}
