import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNameUpdateComponent } from './display-name-update.component';

describe('DisplayNameUpdateComponent', () => {
  let component: DisplayNameUpdateComponent;
  let fixture: ComponentFixture<DisplayNameUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNameUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNameUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
