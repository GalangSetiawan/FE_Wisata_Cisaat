import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeritaExclComponent } from './berita-excl.component';

describe('BeritaExclComponent', () => {
  let component: BeritaExclComponent;
  let fixture: ComponentFixture<BeritaExclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeritaExclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeritaExclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
