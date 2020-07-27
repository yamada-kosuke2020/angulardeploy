import { Component, OnInit, ɵPlayState } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myControl: FormGroup;
  message: string = '';

  // 施設の情報
  facilities = [
    { id: '2', name: '第1会議室' },
    { id: '3', name: '第2会議室' },
    { id: '4', name: '第3会議室' },
    { id: '29', name: 'セミナールーム' },
    { id: '26', name: '面接室1' },
    { id: '27', name: '面接室2' },
    { id: '28', name: '面接室3' }
  ];

  // ルーティングののパラメータ
  routeParam: string;

  // 選択された会議室
  selected = '';

  constructor(private router: Router, private activeRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService) {


    this.myControl = new FormGroup({
      email: new FormControl('@neut.co.jp', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });

    // パラメタ取得
    this.routeParam = JSON.stringify(this.activeRoute.snapshot.queryParamMap);
    // 選択された会議室
    this.selected = this.activeRoute.snapshot.queryParamMap.get('facility');

  }

  ngOnInit(): void {
  }

  get email() { return this.myControl.get('email'); }
  get pass() { return this.myControl.get('pass'); }

  // ログインボタンクリック
  onSubmit() {

    if (this.myControl.invalid) {

      this.message = "バリデーションエラー";

    } else {

      // base64化
      const planeText: string = this.myControl.value.email + ":" + this.myControl.value.pass;
      const endodedText = btoa(planeText);

      console.log('メールアドレスとパスワードをbase64化---->' + endodedText);

      // ユーザー検索
      this.apiService.userExists(this.myControl.value.email, endodedText).subscribe(result => {

        if (!result) {
          this.message = '※ログイン名またはPasswordが違います';
          return;
        }
        // ユーザーがいたらサービスに保存
        this.userService.email = this.myControl.value.email;
        this.userService.base64 = endodedText;
        this.userService.facilityId = this.selected;

        // selectedをキーにして施設名検索
        let facilityName = this.facilities.find(f => f.id === this.selected);
        this.userService.facilityName = facilityName.name;

        // ホーム画面へ遷移
        this.router.navigate(['']);
      });

    }

  }

}
