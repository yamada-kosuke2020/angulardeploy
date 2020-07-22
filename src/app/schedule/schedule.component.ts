import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../service/api.service';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit {


  @Input() content: string;
  @Input() scheduleList;

  // 今見てる会議室の名前
  facilityName;

  @Output() action = new EventEmitter<MouseEvent>();

  panelOpenState = false;
  constructor(private userService: UserService, private apiService: ApiService, public matDialog: MatDialog) {
    this.facilityName = this.userService.facilityName;
  }

  ngOnInit(): void {


  }

  // 延長ダイアログ
  extention(event) {
    this.action.emit(event);
    console.log('スケジュール画面で延長ボタン押された');
  }
}
