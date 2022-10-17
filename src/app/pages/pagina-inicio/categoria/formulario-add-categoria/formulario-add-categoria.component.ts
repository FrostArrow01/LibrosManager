import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-formulario-add-categoria',
  templateUrl: './formulario-add-categoria.component.html',
  styleUrls: ['./formulario-add-categoria.component.scss']
})
export class FormularioAddCategoriaComponent implements OnInit {
  categoriaForm : FormGroup;
  categoria: Categoria;
  idCategoria: number;
  msgError: string;
  adding: boolean;
  listCategorias: Categoria[];
  isnotEnabled: boolean;

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, 
    private activatedRoute: ActivatedRoute, private router: Router) {
     
      this.listCategorias = [];
      this.msgError='';
      this.idCategoria = 0;
      this.adding = false;
      this.isnotEnabled = false;
     
      this.categoriaForm = this.fb.group({
        id: [null, []],
        descripcion: [null, []]       
      });

      this.categoria = {
        id: 0,
        descripcion: ''
      }   
   }
  
   ngOnInit(): void {
    const categoria = this.categoriaForm.getRawValue() as Categoria;
    
    this.categoriaService.getCategoria().subscribe(result => {
      this.listCategorias=result.message;
      if (result.success){
        this.listCategorias = result.message;
      } else{
        let error = result.error;
        console.log("Error al recoger las categorias", error);
      }
    });
    
    //Recogemos el id de la ruta
    this.activatedRoute.paramMap.subscribe((parameters: any) => { 
      this.idCategoria = parameters.get('idCategoria');
    }, error =>{ //que devuelve si hay error
      console.log('No hay id en la ruta o ha fallado', error)
    }, () =>{ //para hacer algo tras la ejecucion
  
    });

    if(this.idCategoria==null){ //si no hay id en la ruta significa que se esta añadiendo uno nuevo
      this.adding=true;
    }else{
      this.adding=false;
        //Recogemos el categoria con ese id
      this.categoriaService.getCategoriaById(this.idCategoria).subscribe(result => {
        if(result.success){
          this.categoria = result.message;
          //Deshabilitamos la edicion del id en caso de estar editando un categoria existente
          this.buildCategoriaForm();
          if(categoria.id != 0){
            this.categoriaForm.get('id')?.disable();
          }
        }else{
          console.log("Error al encontrar el categoria por id");
        this.adding = true;
        }
        
      });  
  
    }
  }

  //Construye el formulario por defecto con los datos del categoria con el id en la ruta
  buildCategoriaForm(){
    this.categoriaForm = this.fb.group({
      id: [this.categoria.id ? this.categoria.id : ''], //[FormsValidators.isDni]],
      descripcion: [this.categoria.descripcion ? this.categoria.descripcion : '', []]
    });
    
  }

  
//Guardar un nuevo categoria, o editar uno existente
  guardarCategoria(): void{
    const categoria = this.categoriaForm.getRawValue() as Categoria;
    
      if(this.adding){
        this.categoriaService.addCategoria(categoria).subscribe(result =>{ 
          if(result.success){
            window.alert("La categoría se ha guardado con éxito");
            this.router.navigate(['/inicio/categoria']);
          }else{
            console.log(result.error);
            window.alert(result.error);
          }
        
           
        });
      }else{
        this.categoriaService.updateCategoria(categoria, categoria.id).subscribe(result =>{ 
          if(result.success){
            window.alert("La categoría se ha guardado con éxito");
            this.router.navigate(['/inicio/categoria']);
          }else{
            console.log(result.error);
            window.alert(result.error);
            this.router.navigate(['/inicio/categoria']);
          }
        });
      }
      
  }

}



