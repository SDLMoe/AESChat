import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptionImageTextComponent } from './encryption-image-text.component';

describe('EncryptionImageTextComponent', () => {
  let component: EncryptionImageTextComponent;
  let fixture: ComponentFixture<EncryptionImageTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptionImageTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionImageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
