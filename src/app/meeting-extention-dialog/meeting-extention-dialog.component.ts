import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-extention-dialog',
  templateUrl: './meeting-extention-dialog.component.html',
  styleUrls: ['./meeting-extention-dialog.component.scss']
})
export class MeetingExtentionDialogComponent implements OnInit {

  public now: Date;
  interval = setInterval(() => {
    this.now = new Date();
  }, 1000);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<MeetingExtentionDialogComponent>, private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {

  }

  // 延長ボタン押下
  extention(value) {

    console.log(value)
    // APIデータ更新

    let obj = {
      "start": {
        "dateTime": "2020-07-25T03:00:00+09:00",
        "timeZone": "Asia/Tokyo"
      },
      "end": {
        "dateTime": "2020-07-25T" + value + ":00+09:00",
        "timeZone": "Asia/Tokyo"
      },
      "isStartOnly": "false",
      "facilities": [
        {
          "id": this.userService.facilityId
        }
      ]
    };

    this.apiService.updateSchedule(obj, '105629').subscribe(result => {
      console.log(JSON.stringify(result));
      this.matDialogRef.close('updated');
    });


  }

}
