import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavMenuTopMenuComponent } from './nav-menu-top-menu.component';

describe('NavMenuTopMenuComponent', () => {
  let component: NavMenuTopMenuComponent;
  let fixture: ComponentFixture<NavMenuTopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuTopMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
