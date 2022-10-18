import { Component, HostListener, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro';
import { Categoria } from 'src/app/models/categoria';
import { Autor } from 'src/app/models/autor';
import { LibroService } from 'src/app/services/libro.service';
import * as FileSaver from 'file-saver';
import { Files } from 'src/app/utils/Files';
// import { Files } from 'src/app/utils/Files';
import * as XLSX from 'xlsx'
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/models/email';



@Component({
  selector: 'app-tarjetas-libro',
  templateUrl: './tarjetas-libro.component.html',
  styleUrls: ['./tarjetas-libro.component.scss']
})
export class TarjetasLibroComponent implements OnInit {

  todos: Boolean=false;
  marca: Boolean= false;
  isEnabled: Boolean= true;
  listLibros: any;
  listLibrosExcel: Libro[];
  formularioAct: boolean;
  libroMandar: Libro;
  enableEmail: Boolean;

  
  
  constructor(private libroService: LibroService, private emailService: EmailService) { 
    this.listLibros = [];
    this.listLibrosExcel = [];
    this.formularioAct = false;
  

 
    this.enableEmail = false;

    this.libroMandar = {
      id: 0,
      titulo: '',
      edicion: 0,
      autor: {dni: '', nombre: '', apellido1: '', apellido2: '', telefono: '', email: ''},
      categoria: {id: 0, descripcion: ''}
    } 
  }

  

  ngOnInit(): void {
    this.libroService.getLibro().subscribe(result =>{ 
      if(result.success){
        this.listLibros = result.message;
      }else{
        console.log("Error al recoger todos los libros", result.error);
      }
    });
  }

  marcartodos(){
    if(this.marca){
      this.marca=false
      this.listLibrosExcel = [];
    }else{
      this.marca=true
      this.listLibrosExcel = this.listLibros;
    }
  }

  addToArray(libro: Libro){
    const found = this.listLibrosExcel.includes(libro);
    const libroFound = this.listLibrosExcel.find(element => element.id === libro.id);
  
    if(found===false){
      this.listLibrosExcel.push(libro);
    }else{
      // this.listLibrosExcel.forEach((element, i) =>{
      const nuevaArray = this.listLibrosExcel.filter(element => element.id !== libroFound?.id)
      this.listLibrosExcel = nuevaArray;

      // });
    }
  }

  exportarEx() {
    if(this.listLibrosExcel.length==0){
      window.alert("Tienes que seleccionar algun libro")
    }else{
      this.libroService.exportExcel(this.listLibrosExcel).subscribe((result) =>{
        Files.saveBlobAsFile(result, result.type, 'libros.xls');
      },()=> {
        console.log('Error al generar el archivo excel')
      
      });
    }
  }

  sendMail(){
    this.enableEmail = this.enableEmail ? this.enableEmail=false : this.enableEmail=true;

  }
  

  borrarLibro(id: number): void{
    if(confirm('¿Seguro que quieres borrar este libro?')){
      this.libroService.deleteLibro(id).subscribe(result =>{
        if(result.success){
          console.log(result)
          window.alert("El libro se ha borrado con exito")
          window.location.reload();
        }else{
          window.alert('Error al borrar el libro');
          console.log('Error al borrar el libro');
        }
      });
    }else{
      return;
    }

    
  }

  editarLibro(libro: Libro): void{
    this.formularioAct=true;
    this.libroMandar = libro;
  }

}
