import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColaboratorComponent } from './select-colaborator.component';

describe('SelectColaboratorComponent', () => {
  let component: SelectColaboratorComponent;
  let fixture: ComponentFixture<SelectColaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectColaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectColaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
