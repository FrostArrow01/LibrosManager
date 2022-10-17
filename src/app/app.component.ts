
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { Autor } from './models/autor';
import { AutorService } from './services/autor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'LibrosManager';
  
  constructor(private autorService: AutorService) {   }

  ngOnInit(): void {
  
    
  }
}
