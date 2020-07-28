import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public isLoading = new Subject<boolean>();


  constructor() { }


  /**
   * スピナーの表示
   *
   * @memberof SpinnerService
   */
  public show(): void {
    this.isLoading.next(true);
  }

  /**
   * スピナーの非表示
   *
   * @memberof SpinnerService
   */
  public hide(): void {
    this.isLoading.next(false);
  }
}
