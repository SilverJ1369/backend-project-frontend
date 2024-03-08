import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineEventFormComponent } from './timeline-event-form.component';

describe('TimelineEventFormComponent', () => {
  let component: TimelineEventFormComponent;
  let fixture: ComponentFixture<TimelineEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineEventFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
