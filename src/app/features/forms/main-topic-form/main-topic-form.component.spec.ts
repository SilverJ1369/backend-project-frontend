import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTopicFormComponent } from './main-topic-form.component';

describe('MainTopicFormComponent', () => {
  let component: MainTopicFormComponent;
  let fixture: ComponentFixture<MainTopicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTopicFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
