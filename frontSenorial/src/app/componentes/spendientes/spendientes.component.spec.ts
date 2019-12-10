import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendientesComponent } from './spendientes.component';

describe('SpendientesComponent', () => {
  let component: SpendientesComponent;
  let fixture: ComponentFixture<SpendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
