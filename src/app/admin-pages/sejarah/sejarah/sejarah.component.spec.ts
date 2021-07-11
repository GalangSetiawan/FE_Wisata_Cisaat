import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SejarahComponent } from './sejarah.component';

describe('SejarahComponent', () => {
  let component: SejarahComponent;
  let fixture: ComponentFixture<SejarahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SejarahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SejarahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
