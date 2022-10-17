import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibroAutorComponent } from './list-libro-autor.component';

describe('ListLibroAutorComponent', () => {
  let component: ListLibroAutorComponent;
  let fixture: ComponentFixture<ListLibroAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLibroAutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLibroAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
