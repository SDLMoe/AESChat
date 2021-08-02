import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectKeyComponent } from './select-key.component';

describe('SelectKeyComponent', () => {
  let component: SelectKeyComponent;
  let fixture: ComponentFixture<SelectKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
