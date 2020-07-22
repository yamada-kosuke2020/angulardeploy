import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit {

  @Input() content: string;
  @Input() scheduleList;
 
  @Output() action = new EventEmitter<MouseEvent>();

  panelOpenState = false;
  constructor(private apiService: ApiService, public matDialog: MatDialog) { }

  ngOnInit(): void {


  }

  // 延長ダイアログ
  extention(event){
    this.action.emit(event);
    console.log('スケジュール画面で延長ボタン押された');
  }
}
