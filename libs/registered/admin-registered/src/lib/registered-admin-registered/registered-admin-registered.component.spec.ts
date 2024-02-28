import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisteredAdminRegisteredComponent } from './registered-admin-registered.component';

describe('RegisteredAdminRegisteredComponent', () => {
  let component: RegisteredAdminRegisteredComponent;
  let fixture: ComponentFixture<RegisteredAdminRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredAdminRegisteredComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisteredAdminRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
