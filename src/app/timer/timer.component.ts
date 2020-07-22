import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../class/schedule';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']

})
export class TimerComponent implements OnInit {

  // 残り時間
  count:number;

  // タイマーの枠の色
  border = 'solid 10px blue';
  // 文字の色
  color = ''

  // countDownの値が変わった
  @Input() set countDown(value: number){
    this.count = value;

    // 残り時間で色を変える
    if(this.count <= 20){
      this.border = 'solid 10px red'
    }

    if(this.count == 0){
      // 終了ダイアログを出す
    }

    console.log('timer->' + this.count);
    console.log('timer border->' + this.border);
  } 
  
  @Input() scheduleList: Array<Schedule>;
  @Output() action = new EventEmitter<MouseEvent>();
  @Input() target: Schedule;
  
  constructor( public matDialog: MatDialog) { }

  ngOnInit(): void {
  
  }

  extention(event){
    this.action.emit(event);
    console.log('タイマー画面で延長ボタン押された');
  }
}
