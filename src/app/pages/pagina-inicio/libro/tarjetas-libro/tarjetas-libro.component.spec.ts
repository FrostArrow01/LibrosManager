import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasLibroComponent } from './tarjetas-libro.component';

describe('TarjetasLibroComponent', () => {
  let component: TarjetasLibroComponent;
  let fixture: ComponentFixture<TarjetasLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetasLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetasLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
