import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  remainingTime$: Observable<{h: number, m: number, s: number}> | undefined;

  constructor() {}

  setDesiredTime(): void {
    if(this.remainingTime$) {
      console.warn('Desired time', this.remainingTime$);
    }
    else {
      console.warn('no data');
    }
  }

  generateRandomTime(): void{
    const randomSeconds = Math.floor(Math.random() * 300) + 5;
    const randomTime = new Date();
    randomTime.setSeconds(randomTime.getSeconds() + randomSeconds);

    const formatRandomTime = randomTime.toISOString().slice(0,16);

    console.warn('Random Time', formatRandomTime);
  }
}
