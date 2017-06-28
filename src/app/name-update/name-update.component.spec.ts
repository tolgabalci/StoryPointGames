import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameUpdateComponent } from './name-update.component';

describe('NameUpdateComponent', () => {
  let component: NameUpdateComponent;
  let fixture: ComponentFixture<NameUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
