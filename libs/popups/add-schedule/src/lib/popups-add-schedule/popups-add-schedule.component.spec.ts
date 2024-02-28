import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupsAddScheduleComponent } from './popups-add-schedule.component';

describe('PopupsAddScheduleComponent', () => {
  let component: PopupsAddScheduleComponent;
  let fixture: ComponentFixture<PopupsAddScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupsAddScheduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupsAddScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
