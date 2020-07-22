import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfMeetingDialogComponent } from './end-of-meeting-dialog.component';

describe('EndOfMeetingDialogComponent', () => {
  let component: EndOfMeetingDialogComponent;
  let fixture: ComponentFixture<EndOfMeetingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndOfMeetingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndOfMeetingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
