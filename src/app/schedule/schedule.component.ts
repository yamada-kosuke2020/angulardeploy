import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../service/api.service';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Schedule } from '../class/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit {

  flg: boolean = true;

  nowEndHour: number = 0;
  nowEndMin: number = 0;
  nextStartHour: number = 0;
  nextStartMin: number = 0;
  public now = new Date();

  @Input() scheduleList: Array<Schedule>;

  // 今見てる会議室の名前
  facilityName;


  message = '';

  @Output() action = new EventEmitter<MouseEvent>();

  panelOpenState = false;
  constructor(private userService: UserService, private apiService: ApiService, public matDialog: MatDialog) {
    this.facilityName = this.userService.facilityName;
  }

  ngOnChanges() {

    if (this.scheduleList === undefined) {
      this.message = "会議はありません";
    }
    else {
      //現会議終了時間
      var nowEnd = new Date(this.scheduleList[0].endDate);
      this.nowEndHour = nowEnd.getHours();
      console.log("現会議終了時間" + this.nowEndHour);
      this.nowEndMin = nowEnd.getMinutes();
      console.log("現会議終了分" + this.nowEndMin);
      //次会議開始時間
      var nextStart = new Date(this.scheduleList[1].startDate);
      this.nextStartHour = nextStart.getHours();
      console.log("次会議開始時間" + this.nextStartHour);
      this.nextStartMin = nextStart.getMinutes();
      console.log("次会議開始分" + this.nextStartMin);

      //延長ボタン出現判断    
      //次の会議が存在していて、終了と開始が同じだった場合true
      if (this.nowEndHour === this.nextStartHour && this.nowEndMin === this.nextStartMin) {
        console.log("終了時：" + this.nowEndHour + "開始時：" + this.nextStartHour + "終了分：" + this.nowEndMin + "開始分：" + this.nextStartMin);
        this.flg = false;
      }
      //次の会議が存在しないor次の会議まで時間がある
      else {
        this.flg = true;
      }
      console.log("会議室は" + this.flg);
    }
  }

  ngOnInit(): void {


  }

  // 延長ダイアログ
  extention(event) {
    this.action.emit(event);
    console.log('スケジュール画面で延長ボタン押された');
  }
}
