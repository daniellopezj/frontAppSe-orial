import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SasignadosComponent } from './sasignados.component';

describe('SasignadosComponent', () => {
  let component: SasignadosComponent;
  let fixture: ComponentFixture<SasignadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SasignadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SasignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
