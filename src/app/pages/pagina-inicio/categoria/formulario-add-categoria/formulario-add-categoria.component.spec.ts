import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAddCategoriaComponent } from './formulario-add-categoria.component';

describe('FormularioAddCategoriaComponent', () => {
  let component: FormularioAddCategoriaComponent;
  let fixture: ComponentFixture<FormularioAddCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAddCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAddCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
