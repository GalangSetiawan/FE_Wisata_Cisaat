import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasilitasComponent } from './fasilitas.component';

describe('FasilitasComponent', () => {
  let component: FasilitasComponent;
  let fixture: ComponentFixture<FasilitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FasilitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FasilitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
