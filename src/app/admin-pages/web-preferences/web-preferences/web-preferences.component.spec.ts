import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPreferencesComponent } from './web-preferences.component';

describe('WebPreferencesComponent', () => {
  let component: WebPreferencesComponent;
  let fixture: ComponentFixture<WebPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
