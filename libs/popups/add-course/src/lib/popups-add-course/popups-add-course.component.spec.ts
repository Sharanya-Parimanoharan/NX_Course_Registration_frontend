import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupsAddCourseComponent } from './popups-add-course.component';

describe('PopupsAddCourseComponent', () => {
  let component: PopupsAddCourseComponent;
  let fixture: ComponentFixture<PopupsAddCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupsAddCourseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupsAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
