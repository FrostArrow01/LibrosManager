import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './pages/pagina-inicio/autor/tarjetas-autor/autores.component';
import { FormularioAddComponent } from './pages/pagina-inicio/autor/formulario-add-autor/formulario-add.component';
import { PaginaInicioComponent } from './pages/pagina-inicio/pagina-inicio.component';
import { TarjetasCategoriaComponent } from './pages/pagina-inicio/categoria/tarjetas-categoria/tarjetas-categoria.component';
import { FormularioAddCategoriaComponent } from './pages/pagina-inicio/categoria/formulario-add-categoria/formulario-add-categoria.component';
import { TarjetasLibroComponent } from './pages/pagina-inicio/libro/tarjetas-libro/tarjetas-libro.component';
import { FormularioAddLibroComponent } from './pages/pagina-inicio/libro/formulario-add-libro/formulario-add-libro.component';
import { ListLibroAutorComponent } from './pages/pagina-inicio/autor/list-libro-autor/list-libro-autor.component';
import { ListLibroCategoriaComponent } from './pages/pagina-inicio/categoria/list-libro-categoria/list-libro-categoria.component';

const routes: Routes = [
  
    { path: 'inicio', component: PaginaInicioComponent},
    //Autores
    { path: 'inicio/autor', component: AutoresComponent },
    { path: 'inicio/autor/add', component: FormularioAddComponent },
    { path: 'inicio/autor/add/:dniAutor', component: FormularioAddComponent },
    { path: 'inicio/autor/libros/:dniAutor', component: ListLibroAutorComponent },

    //Libros
    { path: 'inicio/libro', component: TarjetasLibroComponent },
    { path: 'inicio/libro/add', component: FormularioAddLibroComponent },
    { path: 'inicio/libro/add/:idLibro', component: FormularioAddLibroComponent },

    
    //Categorias
    { path: 'inicio/categoria', component: TarjetasCategoriaComponent },
    { path: 'inicio/categoria/add', component: FormularioAddCategoriaComponent },
    { path: 'inicio/categoria/add/:idCategoria', component: FormularioAddCategoriaComponent },
    { path: 'inicio/categoria/libros/:idCategoria', component: ListLibroCategoriaComponent },
 
    { path: '**', redirectTo: 'inicio' }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 
 
}


