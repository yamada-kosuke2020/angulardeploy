import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../class/schedule';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']

})
export class TimerComponent implements OnInit {

  // 残り時間(ミリ秒)
  count: number;

  // HH:MM:ss
  countString: string = '00:00:00';

  // タイマーの枠の色
  border = 'solid 20px blue';
  
  // 文字の色
  color = ''

  // countDownの値が変わった
  @Input() set countDown(value: number) {
    this.count = value;

    // 残り時間で色を変える
    if (this.count <= 600000) {
      this.border = 'solid 20px yellow'
    }

    if (this.count <= 300000) {
      this.border = 'solid 20px red'
    }

    console.log('timer->' + this.count);
    console.log('timer border->' + this.border);

    // マイナスをプラスに
    this.count = this.count < 0 ? this.count * -1 : this.count;

    // 時間を取得
    let cHour = Math.floor(this.count / (1000 * 60 * 60));
    this.count -= (cHour * (1000 * 60 * 60));

    // 分を取得
    let cMinute = Math.floor(this.count / (1000 * 60));
    this.count -= (cMinute * (1000 * 60));

    // 秒を取得
    let cSecond = Math.floor(this.count / (1000));
    this.count -= (cSecond * (1000));

    this.countString = ("00" + cHour).slice(-2) + ':' + ("00" + cMinute).slice(-2) + ':' + ("00" + cSecond).slice(-2);

    console.log(this.countString);

  }

  @Input() scheduleList: Array<Schedule>;
  @Output() action = new EventEmitter<MouseEvent>();
  @Input() target: Schedule;

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {

  }

  extention(event) {
    this.action.emit(event);
    console.log('タイマー画面で延長ボタン押された');
  }
}
