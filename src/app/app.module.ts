import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorService } from './services/autor.service';
import { AutoresComponent } from './pages/pagina-inicio/autor/tarjetas-autor/autores.component';
import { FormularioAddComponent } from './pages/pagina-inicio/autor/formulario-add-autor/formulario-add.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginaInicioComponent } from './pages/pagina-inicio/pagina-inicio.component';
import { FormularioAddCategoriaComponent } from './pages/pagina-inicio/categoria/formulario-add-categoria/formulario-add-categoria.component';
import { TarjetasCategoriaComponent } from './pages/pagina-inicio/categoria/tarjetas-categoria/tarjetas-categoria.component';
import { FormularioAddLibroComponent } from './pages/pagina-inicio/libro/formulario-add-libro/formulario-add-libro.component';
import { TarjetasLibroComponent } from './pages/pagina-inicio/libro/tarjetas-libro/tarjetas-libro.component';
import { LibroService } from './services/libro.service';
import { CategoriaService } from './services/categoria.service';
import { ListLibroAutorComponent } from './pages/pagina-inicio/autor/list-libro-autor/list-libro-autor.component';
import { ListLibroCategoriaComponent } from './pages/pagina-inicio/categoria/list-libro-categoria/list-libro-categoria.component';
import { NavBarComponent } from './models/components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BotonMasComponent } from './pages/pagina-inicio/autor/boton-mas/boton-mas.component';
import { NgModel } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AutoresComponent,
    FormularioAddComponent,
    PaginaInicioComponent,
    FormularioAddCategoriaComponent,
    TarjetasCategoriaComponent,
    FormularioAddLibroComponent,
    TarjetasLibroComponent,
    ListLibroAutorComponent,
    ListLibroCategoriaComponent,
    NavBarComponent,
    BotonMasComponent,
    
   
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [AutorService, LibroService, CategoriaService],
  bootstrap: [AppComponent],
})
export class AppModule { }
