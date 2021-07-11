import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePerkembanganComponent } from './timeline-perkembangan.component';

describe('TimelinePerkembanganComponent', () => {
  let component: TimelinePerkembanganComponent;
  let fixture: ComponentFixture<TimelinePerkembanganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinePerkembanganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePerkembanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
