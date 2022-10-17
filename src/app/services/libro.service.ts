import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';
import { ObjectResponse } from './backend-service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'



@Injectable({providedIn: 'root'})
export class LibroService {
  private apiServerUrl = 'http://localhost:8080';

  
  constructor(private http: HttpClient) { 

  }

  public exportExcel(lista2: Libro[]): Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Blob>(`${this.apiServerUrl}/libro/exportExcel`, lista2,
    {headers: headers, responseType: 'blob' as 'json', observe: 'body'});
  }


  public getLibro(): Observable<ObjectResponse<Libro[]>>{
    return this.http.get<ObjectResponse<Libro[]>>(`${this.apiServerUrl}/libro/all`);
  }

  public getLibroById(libroId: number): Observable<ObjectResponse<Libro>>{
    return this.http.get<ObjectResponse<Libro>>(`${this.apiServerUrl}/libro/getById/${libroId}`);
  }

  public addLibro(libro: Libro): Observable<ObjectResponse<Libro>>{
    return this.http.post<ObjectResponse<Libro>>(`${this.apiServerUrl}/libro/add`, libro);
  }

  public updateLibro(libro: Libro, libroId: number): Observable<ObjectResponse<Libro>>{
    // debugger
    return this.http.put<ObjectResponse<Libro>>(`${this.apiServerUrl}/libro/editar/${libroId}`, libro);
  }

  public deleteLibro(libroId: number): Observable<ObjectResponse<Libro>>{
    return this.http.delete<ObjectResponse<Libro>>(`${this.apiServerUrl}/libro/delete/${libroId}`);
  }

  public getLibrobyAutor(autorDni: String): Observable<ObjectResponse<Libro[]>>{
    return this.http.get<ObjectResponse<Libro[]>>(`${this.apiServerUrl}/libro/autor/${autorDni}`);
  }
  
  public getLibrobyCategoria(categoriaId: number): Observable<ObjectResponse<Libro[]>>{
    return this.http.get<ObjectResponse<Libro[]>>(`${this.apiServerUrl}/libro/categoria/${categoriaId}`);
  }

}
