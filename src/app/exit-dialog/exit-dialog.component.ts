import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-dialog',
  templateUrl: './exit-dialog.component.html',
  styleUrls: ['./exit-dialog.component.scss']
})
export class ExitDialogComponent implements OnInit {
  timerEnd=false;
  constructor(public matDialogRef:MatDialogRef<ExitDialogComponent>) { }

  ngOnInit(): void {
  }

  timerStop():void{
    this.matDialogRef.close('true');
  }
}
