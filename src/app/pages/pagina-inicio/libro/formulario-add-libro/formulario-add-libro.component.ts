import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from 'src/app/models/autor';
import { Categoria } from 'src/app/models/categoria';
import { Libro } from 'src/app/models/libro';
import { AutorService } from 'src/app/services/autor.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-formulario-add-libro',
  templateUrl: './formulario-add-libro.component.html',
  styleUrls: ['./formulario-add-libro.component.scss']
})
export class FormularioAddLibroComponent implements OnInit {

  libroForm : FormGroup;
  libro: Libro;
  idLibro: number;
  msgError: string;
  adding: boolean;
  listLibros: Libro[];
  isnotEnabled: boolean;
  listAutores: Autor[];
  listCategorias: Categoria[];

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private libroService: LibroService, private autorService: AutorService, 
    private activatedRoute: ActivatedRoute, private router: Router) { 
      this.listLibros = [];
      this.listAutores = [];
      this.listCategorias = [];
      this.msgError='';
      this.idLibro = 0;
      this.adding = false;
      this.isnotEnabled = false;
     
      this.libroForm = this.fb.group({
        id: [null, []],
        titulo: [null, []],
        edicion: [null, []],
        autor: [null, []] ,
        categoria: [null, []]  
      });

      this.libro = {
        id: 0,
        titulo: '',
        edicion: 0,
        autor: {dni: '', nombre: '', apellido1: '', apellido2: '', telefono: '', email: ''},
        categoria: {id: 0, descripcion: ''}
      }   
 
}
  ngOnInit(): void {
    this.autorService.getAutor().subscribe(result =>{  //recogemos todos los autores
      if (result.success){
        this.listAutores = result.message;
      } else{
        let error = result.error;
        console.log("Error al encontrar el autor por dni", error);
      }
    });

    this.categoriaService.getCategoria().subscribe(result =>{  //recogemos todos los autores
      if (result.success){
        this.listCategorias = result.message;
      } else{
        let error = result.error;
        console.log("Error al recoger las categorias", error);
      }
    });

    
    const libro = this.libroForm.getRawValue() as Libro;
    
    this.libroService.getLibro().subscribe(result => {
      if(result.success){
        this.listLibros=result.message;
      }else{
        console.log('Error al recoger todos los libros');
      }     
    });
    
    //Recogemos el id de la ruta
    this.activatedRoute.paramMap.subscribe((parameters: any) => { 
      this.idLibro = parameters.get('idLibro');
    }, error =>{ //que devuelve si hay error
      console.log('No hay id en la ruta o ha fallado', error)
    }, () =>{ //para hacer algo tras la ejecucion
  
    });

    if(!this.idLibro){ //si no hay id en la ruta significa que se esta añadiendo uno nuevo
      this.adding=true;

      this.buildLibroForm();
        if(libro.id != 0){
          this.libroForm.get('id')?.disable();
        }
    }else{
      this.adding=false;
        //Recogemos el libro con ese id
      this.libroService.getLibroById(this.idLibro).subscribe(result => {
        if(result.success){
          this.libro = result.message;
          this.buildLibroForm();
        }else{
          console.log("Error al encontrar el libro por id");
        this.adding = true;
        }
      });
    }
  }

  //Construye el formulario por defecto con los datos del libro con el id en la ruta
  buildLibroForm(): void{
    this.libroForm = this.fb.group({
      id: [this.libro.id ? this.libro.id : ''], 
      titulo: [this.libro.titulo ? this.libro.titulo : '', []],
      edicion: [this.libro.edicion ? this.libro.edicion : '', []],
      autor: [this.libro.autor.dni ? this.libro.autor.dni : '', []],
      categoria: [this.libro.categoria.id ? this.libro.categoria.id : '', []]
    });
    
  }

  
//Guardar un nuevo libro, o editar uno existente
  guardarLibro(): void{
    const libro = this.libroForm.getRawValue() as Libro;
    //encuentra y guarda el autor de listAutores que tenga la misma dni que en el formulario
    const autor1 = this.listAutores.find(item => item.dni == this.libroForm.get('autor')?.value);  
    if (autor1) libro.autor = autor1;

    const categoria1 = this.listCategorias.find(item => item.id == this.libroForm.get('categoria')?.value);
    if (categoria1) libro.categoria = categoria1;
      if(this.adding){
        this.libroService.addLibro(libro).subscribe(result =>{ 
          if(result.success){
            window.alert("El libro se ha guardado con éxito");
            this.router.navigate(['/inicio/libro']);
          }else{
            window.alert(result.error);
          }   
        });
      }else{
        window.alert(libro.id)
        // debugger
        this.libroService.updateLibro(libro, libro.id).subscribe(result =>{ 
          if(result.success){
            window.alert("El libro se ha editado con éxito");
            this.router.navigate(['/inicio/libro']);
          }else{
            window.alert(result.error);
          }   
        });
      }
  }

}
