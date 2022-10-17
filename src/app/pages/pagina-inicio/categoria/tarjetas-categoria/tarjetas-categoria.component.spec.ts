import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasCategoriaComponent } from './tarjetas-categoria.component';

describe('TarjetasCategoriaComponent', () => {
  let component: TarjetasCategoriaComponent;
  let fixture: ComponentFixture<TarjetasCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetasCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetasCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
