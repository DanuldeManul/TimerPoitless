import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent implements OnInit, OnDestroy {
  @Input() remainingTime$: Observable<{h: number, m: number, s: number}> | undefined;
  time: {h: number, m: number, s: number} = {h: 0, m: 0, s: 0};
  private destroy$ = new Subject<void>();
  
  constructor() { }

  ngOnInit() {
    if (this.remainingTime$) {
      this.remainingTime$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(time => {
        this.time = time;
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
