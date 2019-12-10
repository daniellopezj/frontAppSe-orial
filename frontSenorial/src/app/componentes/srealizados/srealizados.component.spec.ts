import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrealizadosComponent } from './srealizados.component';

describe('SrealizadosComponent', () => {
  let component: SrealizadosComponent;
  let fixture: ComponentFixture<SrealizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrealizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
