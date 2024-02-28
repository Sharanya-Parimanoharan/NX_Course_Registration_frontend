import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordResetPasswordResetComponent } from './password-reset-password-reset.component';

describe('PasswordResetPasswordResetComponent', () => {
  let component: PasswordResetPasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordResetPasswordResetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordResetPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
