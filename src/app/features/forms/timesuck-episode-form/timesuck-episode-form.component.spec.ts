import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesuckEpisodeFormComponent } from './timesuck-episode-form.component';

describe('TimesuckEpisodeFormComponent', () => {
  let component: TimesuckEpisodeFormComponent;
  let fixture: ComponentFixture<TimesuckEpisodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesuckEpisodeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimesuckEpisodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
