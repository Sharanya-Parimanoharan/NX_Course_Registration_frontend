import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavMenuNavMenuComponent } from './nav-menu-nav-menu.component';

describe('NavMenuNavMenuComponent', () => {
  let component: NavMenuNavMenuComponent;
  let fixture: ComponentFixture<NavMenuNavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuNavMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
