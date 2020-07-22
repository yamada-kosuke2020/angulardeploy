import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-end-of-meeting-dialog',
  templateUrl: './end-of-meeting-dialog.component.html',
  styleUrls: ['./end-of-meeting-dialog.component.scss']
})
export class EndOfMeetingDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
  public matDialogRef : MatDialogRef<EndOfMeetingDialogComponent>) { }

  ngOnInit(): void {
  }

  // 会議終了
  exit(){
    this.matDialogRef.close('exit');
  }

  extention(){
    this.matDialogRef.close('extention');
  }

}
