import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavMenuSideNavMenuComponent } from './nav-menu-side-nav-menu.component';

describe('NavMenuSideNavMenuComponent', () => {
  let component: NavMenuSideNavMenuComponent;
  let fixture: ComponentFixture<NavMenuSideNavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuSideNavMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuSideNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
