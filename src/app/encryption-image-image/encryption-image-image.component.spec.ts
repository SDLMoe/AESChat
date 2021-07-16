import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptionImageImageComponent } from './encryption-image-image.component';

describe('EncryptionImageImageComponent', () => {
  let component: EncryptionImageImageComponent;
  let fixture: ComponentFixture<EncryptionImageImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptionImageImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionImageImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
