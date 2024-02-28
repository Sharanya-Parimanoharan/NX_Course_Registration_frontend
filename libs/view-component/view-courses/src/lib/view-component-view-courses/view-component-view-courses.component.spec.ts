import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponentViewCoursesComponent } from './view-component-view-courses.component';

describe('ViewComponentViewCoursesComponent', () => {
  let component: ViewComponentViewCoursesComponent;
  let fixture: ComponentFixture<ViewComponentViewCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewComponentViewCoursesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewComponentViewCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
