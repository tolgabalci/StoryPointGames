import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailUpdateComponent } from './email-update.component';

describe('EmailUpdateComponent', () => {
  let component: EmailUpdateComponent;
  let fixture: ComponentFixture<EmailUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
