import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, interval, map, takeUntil, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-timmer-component',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  remainingTime$: Observable<{h: number, m: number, s: number}> | undefined;
  private destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.startCountDown();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startCountDown() {
    const endTime = new Date().getTime() + 1000 * 60 * 5;

    this.remainingTime$ = interval(1000).pipe(
      map(() => {
        const now = new Date().getTime(); 
        const distance = endTime - now;
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return {h: hours, m: minutes, s: seconds};
      }),
      takeWhile(time => time.h >= 0 && time.m >= 0 && time.s >= 0),
      tap(time => {
        if (time.h === 0 && time.m === 0 && time.s === 0) {
          console.warn('The timer is done!')
          this.destroy$.next();
        }
      }),
      takeUntil(this.destroy$)
    );
  }

}
