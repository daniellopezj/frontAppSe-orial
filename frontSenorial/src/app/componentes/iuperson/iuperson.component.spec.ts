import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IUPersonComponent } from './iuperson.component';

describe('IUPersonComponent', () => {
  let component: IUPersonComponent;
  let fixture: ComponentFixture<IUPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IUPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IUPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
