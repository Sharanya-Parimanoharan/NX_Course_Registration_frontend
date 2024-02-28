import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisteredRegisteredComponent } from './registered-registered.component';

describe('RegisteredRegisteredComponent', () => {
  let component: RegisteredRegisteredComponent;
  let fixture: ComponentFixture<RegisteredRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredRegisteredComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisteredRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
