import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponentViewSchedulesComponent } from './view-component-view-schedules.component';

describe('ViewComponentViewSchedulesComponent', () => {
  let component: ViewComponentViewSchedulesComponent;
  let fixture: ComponentFixture<ViewComponentViewSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewComponentViewSchedulesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewComponentViewSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
