import { Injectable } from '@angular/core';
import { Schedule } from '../class/schedule';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public authInfo: string = '';
  public email: string = '';

  constructor(private http: HttpClient, private userService: UserService) { }

  // ユーザー存在確認
  userExists(email: string, authInfo): Observable<boolean> {

    let httpOptions = {
      headers: new HttpHeaders().set('X-Cybozu-Authorization', authInfo),
    };

    return new Observable(observe => {
      this.http.get('/api/base/users?name=' + email, httpOptions).subscribe(result => {

        console.log('service ユーザー検索成功');
        observe.next(true);
        observe.complete();

      }, error => {

        console.log('service ユーザー検索失敗');
        observe.next(false);
        observe.complete();

      });
    });
  }

  // 予定一覧取得
  getScheduleList(startTime: Date, endTime: Date, facilityId: string): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders().set('X-Cybozu-Authorization', this.userService.base64),
    };
    return this.http.get('/api/schedule/events?limit=200&rangeStart=' + startTime.toISOString() +
      '&rangeEnd=' + endTime.toISOString() + '&target=' + facilityId + '&targetType=facility&orderBy=start asc', httpOptions);

  }

  // 終了時間更新
  updateSchedule(schedule, id): Observable<Schedule> {

    return this.http.patch<Schedule>('/api/schedule/events/' + id, schedule, {
      headers: { 'X-Cybozu-Authorization': this.userService.base64, 'Content-Type': 'application/json' }
    });

  }

}
