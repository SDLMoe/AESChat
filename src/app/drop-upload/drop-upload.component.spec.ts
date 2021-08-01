import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropUploadComponent } from './drop-upload.component';

describe('DropUploadComponent', () => {
  let component: DropUploadComponent;
  let fixture: ComponentFixture<DropUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
