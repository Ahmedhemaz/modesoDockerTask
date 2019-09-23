import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesInfoComponent } from './notes-info.component';

describe('NotesInfoComponent', () => {
  let component: NotesInfoComponent;
  let fixture: ComponentFixture<NotesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
