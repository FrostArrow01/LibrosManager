import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonMasComponent } from './boton-mas.component';

describe('BotonMasComponent', () => {
  let component: BotonMasComponent;
  let fixture: ComponentFixture<BotonMasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonMasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
