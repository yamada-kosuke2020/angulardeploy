import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TimerComponent } from './timer/timer.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LoginComponent } from './login/login.component';
import { MeetingExtentionDialogComponent } from './meeting-extention-dialog/meeting-extention-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimerComponent,
    ScheduleComponent,
    LoginComponent,
    MeetingExtentionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
