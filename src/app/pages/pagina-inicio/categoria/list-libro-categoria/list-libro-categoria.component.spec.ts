import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibroCategoriaComponent } from './list-libro-categoria.component';

describe('ListLibroCategoriaComponent', () => {
  let component: ListLibroCategoriaComponent;
  let fixture: ComponentFixture<ListLibroCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLibroCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLibroCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
