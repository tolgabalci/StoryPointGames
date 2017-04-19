import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedGamesComponent } from './saved-games.component';

describe('SavedGamesComponent', () => {
  let component: SavedGamesComponent;
  let fixture: ComponentFixture<SavedGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
