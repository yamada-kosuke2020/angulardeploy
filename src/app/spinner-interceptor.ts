import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from './service/spinner.service';

/**
 * HttpClientModuleのリクエスト、レスポンス処理のタイミングで、
 * スピナーを表示する。
 *
 * @export
 * @class SpinnerInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(public spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // HTTPリクエストのタイミングで呼び出される
    // スピナーを表示する
    this.spinnerService.show();
    return next.handle(req).pipe(finalize(() => this.spinnerService.hide()));
  }
}