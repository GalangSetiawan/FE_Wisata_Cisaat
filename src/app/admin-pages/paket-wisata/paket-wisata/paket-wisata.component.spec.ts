import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaketWisataComponent } from './paket-wisata.component';

describe('PaketWisataComponent', () => {
  let component: PaketWisataComponent;
  let fixture: ComponentFixture<PaketWisataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaketWisataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaketWisataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
