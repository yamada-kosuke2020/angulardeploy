import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { UserService } from '../service/user.service';
import { Schedule } from '../class/schedule';
import { Employee } from '../class/employee';
import { MatDialog } from '@angular/material/dialog';
import { EndOfMeetingDialogComponent } from '../end-of-meeting-dialog/end-of-meeting-dialog.component';
import { MeetingExtentionDialogComponent } from '../meeting-extention-dialog/meeting-extention-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rangeStart;
  rangeEnd;
  scheduleList: Array<Schedule>;
  schedule;


  period;

  targetSchedule: Array<Schedule>
  target = new Schedule();

  meetingSubject;
  meetingStart;
  meetingEnd;

  timer;
  countDown:number;

  // timerのスタイル
  border = 'solid 10px #33b5e5';
  color = 'black';

  constructor(private apiService: ApiService, public matDialog: MatDialog, private userService: UserService) {


     // 開始時間
     this.rangeStart = new Date();

     // 終了時間
     this.rangeEnd = new Date();
     this.rangeEnd.setHours(23, 59, 59, 999);
 


     // 予定一覧取得
    this.apiService.getScheduleList(this.rangeStart, this.rangeEnd, this.userService.facilityId).subscribe(result => {

      this.schedule = result;
      console.log('今日の会議一覧');
      console.log(this.schedule);

    
      // 対象の会議 
      console.log(this.schedule.events[0]);


      // クラスに詰める
      this.scheduleList = this.schedule.events.map(element => {

        const tempScedule = new Schedule();

        // TODO nullチェックする
        tempScedule.subject = element.subject;
        tempScedule.startDate = element.start.dateTime;
        tempScedule.endDate = element.end.dateTime;
        tempScedule.creatorName = element.creator.name;
        tempScedule.eventMenu = element.eventMenu;
        tempScedule.createdAt = element.createdAt;
        tempScedule.updatedAt = element.updatedAt;
        tempScedule.updaterName = element.updater.name;
        tempScedule.attendees = element.attendees.map(atd => {

          const atendee = new Employee();

          atendee.id = atd.id;
          atendee.name = atd.name;
          atendee.type = atd.type;
          atendee.code = atd.code;

          return atendee;
        });
        return tempScedule;
      });

      console.log('homeでscheduleListに保存できた');

      const today = new Date();

      // 今の時間適当にセット
      //today.setHours(18, 0, 0, 0);

      // 今の時間にマッチする会議を検索
      this.targetSchedule = this.scheduleList.filter((s) => {
        return (new Date(s.startDate) <= today && new Date(s.endDate) >= today);
      });

      if (this.targetSchedule.length == 0) {
        // 会議が見つからない
        console.log('会議はありません');
        this.meetingSubject = '会議はありません';
        this.border = 'solid 10px gray';
        //this.countDown = "会議はありません";

        // this.countDown = 30;
        // this.timer = setInterval(() => {
        //   this.debugTimer()
        // }, 1000)
      } else {

        // 開催中の会議
        console.log(JSON.stringify('今の開催中の会議------>' + this.targetSchedule[0].subject));

        // 1件にする
        this.target.subject = this.targetSchedule[0].subject;
        this.target.startDate = this.targetSchedule[0].startDate;
        this.target.endDate = this.targetSchedule[0].endDate;

        //タイマー呼び出し
        setInterval(() => { this.startTimer(new Date(this.targetSchedule[0].endDate)) }, 1000);

        //デバッグ
        // this.countDown = 30;
        // this.timer = setInterval(() => {
        //   this.debugTimer()
        // }, 1000)
      }
    });

  }

  // コンポーネント破棄
  ngOnDestroy(){
    //this.timerStop();
  }

  ngOnInit(): void {

  }

  // デバッグ用
  debugTimer() {
    this.countDown--;
    if(this.countDown == 0){
      this.meetingEndDialog();
    }
    console.log(this.countDown);
  }

  // 会議終了ダイアログ
  meetingEndDialog() {
    let dialogRef = this.matDialog.open(EndOfMeetingDialogComponent, {
  
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('会議終了ダイアログ閉じた', result);

      // 終了ボタン押されてたら
      if (result === 'exit') {
        this.timerStop();
      }

      // 延長ボタン押されてたら
      if (result === 'extention') {
        this.extention();
      }

    });
  }

  // 延長
  extention() {

    // 今の会議の終了時間取得 HH:mm形式
    let endTime: string = ("0" + new Date(this.target.endDate).getHours()).slice(-2) + ':' + ("0" + new Date(this.target.endDate).getMinutes()).slice(-2);

    let dialogRef = this.matDialog.open(MeetingExtentionDialogComponent, {
      data: { 'endTime': endTime }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Extention Dialog result: ${result}`);
      // 再読み込み
      //this.ngOnInit();
    });

  }

  // timerストップ
  timerStop() {
    clearInterval(this.timer);
    this.border = 'solid 10px gray';
    //this.countDown = "会議は終了しました";
  }

  // タイマー
  startTimer(end: Date) {
    let currentDate = new Date();
    this.period = end.getTime() - currentDate.getTime();
    if(this.period === 0){
      this.meetingEndDialog();
    }
    console.log('ミリ秒--->' + this.period);
  }

  // 延長のイベント検知
  doClick(event) {
    console.log('home:子のイベント検知');
    this.extention();
  }
}
