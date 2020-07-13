import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrinputComponent } from './srinput.component';

describe('SrinputComponent', () => {
  let component: SrinputComponent;
  let fixture: ComponentFixture<SrinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
