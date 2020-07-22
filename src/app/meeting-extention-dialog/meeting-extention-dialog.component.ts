import { Component, OnInit,  Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-extention-dialog',
  templateUrl: './meeting-extention-dialog.component.html',
  styleUrls: ['./meeting-extention-dialog.component.scss']
})
export class MeetingExtentionDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data : any,
  public matDialogRef : MatDialogRef<MeetingExtentionDialogComponent> , private apiService: ApiService) { }

  ngOnInit(): void {

  }

  // 延長ボタン押下
  extention(){

    // APIデータ更新
  
    let jsonString = `{
      "start": {
        "dateTime": "2020-07-25T03:00:00+09:00",
        "timeZone": "Asia/Tokyo"
      },
      "end": {
        "dateTime": "2020-07-25T06:00:00+09:00",
        "timeZone": "Asia/Tokyo"
      },
      "isStartOnly": "false",
      "facilities": [
        {
          "code": "002"
        }
      ]
    }`;

    let obj = JSON.parse(jsonString);

    this.apiService.updateSchedule(obj).subscribe(result => {
      console.log(JSON.stringify(result));
    });

    this.matDialogRef.close('updated');
  }

}
