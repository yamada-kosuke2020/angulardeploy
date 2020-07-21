import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingExtentionDialogComponent } from './meeting-extention-dialog.component';

describe('MeetingExtentionDialogComponent', () => {
  let component: MeetingExtentionDialogComponent;
  let fixture: ComponentFixture<MeetingExtentionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingExtentionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingExtentionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
