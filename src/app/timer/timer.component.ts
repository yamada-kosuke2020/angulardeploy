import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../class/schedule';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']

})
export class TimerComponent implements OnInit {

  // HH:MM:ss
  countString: string = '00:00:00';

  // タイマーの枠の色
  border = 'solid 20px gray';

  // 文字の色
  color = ''

  @Input() countDown;
  @Input() scheduleList: Array<Schedule>;
  @Output() action = new EventEmitter<MouseEvent>();
  @Input() target: Schedule;

  blueFlame: boolean;
  yellowFlame: boolean;
  redFlame: boolean;

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.countDown);
    this.blueFlame = false;
    this.yellowFlame = false;
    this.redFlame = false;
  }


  ngOnChanges() {

    if (this.scheduleList === undefined || this.scheduleList.length == 0) {

    }
    // this.border = 'solid 20px skyblue'
    this.blueFlame = true;
    this.yellowFlame = false;
    this.redFlame = false;


    console.log('change    ' + this.countDown);

    // 残り時間で色を変える
    if (this.countDown <= 600000) {
      // this.border = 'solid 20px yellow'
      // this.color = 'yellow'
      this.blueFlame = false;
      this.yellowFlame = true;
      this.redFlame = false;
    }

    if (this.countDown <= 300000) {
      // this.border = 'solid 20px red'
      // this.color = 'red'
      this.blueFlame = false;
      this.yellowFlame = false;
      this.redFlame = true;
    }


    if (this.countDown <= 0) {
      // this.color = 'red'
      this.blueFlame = false;
      this.yellowFlame = false;
      this.redFlame = true;
    }

    // マイナスをプラスに
    this.countDown = this.countDown < 0 ? this.countDown * -1 : this.countDown;

    // 時間を取得
    let cHour = Math.floor(this.countDown / (1000 * 60 * 60));
    this.countDown -= (cHour * (1000 * 60 * 60));

    // 分を取得
    let cMinute = Math.floor(this.countDown / (1000 * 60));
    this.countDown -= (cMinute * (1000 * 60));

    // 秒を取得
    let cSecond = Math.floor(this.countDown / (1000));
    this.countDown -= (cSecond * (1000));

    this.countString = ("00" + cHour).slice(-2) + ':' + ("00" + cMinute).slice(-2) + ':' + ("00" + cSecond).slice(-2);

  }

  extention(event) {
    this.action.emit(event);
    console.log('タイマー画面で延長ボタン押された');
  }
}
