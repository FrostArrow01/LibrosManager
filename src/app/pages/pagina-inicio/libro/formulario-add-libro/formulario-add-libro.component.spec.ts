import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAddLibroComponent } from './formulario-add-libro.component';

describe('FormularioAddLibroComponent', () => {
  let component: FormularioAddLibroComponent;
  let fixture: ComponentFixture<FormularioAddLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAddLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAddLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
