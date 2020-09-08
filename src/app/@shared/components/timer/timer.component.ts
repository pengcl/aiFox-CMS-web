import {Component, ViewChild, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {interval as observableInterval} from 'rxjs';

class Flipper {
  isFlipping = false;
  flipNode: Element;
  frontNode: HTMLElement | null;
  backNode: HTMLElement | null;
  duration = 600;

  constructor(node: Element, currentTime: string, nextTime: string) {
    this.flipNode = node;
    this.frontNode = node.querySelector('.front');
    this.backNode = node.querySelector('.back');
    this.setFrontTime(currentTime);
    this.setBackTime(nextTime);
  }

  setFrontTime(time: string) {
    this.frontNode.dataset.number = time;
  }

  setBackTime(time: string) {
    this.backNode.dataset.number = time;
  }

  flipDown(currentTime: string, nextTime: string) {
    if (this.isFlipping) {
      return false;
    }
    this.isFlipping = true;
    this.setFrontTime(currentTime);
    this.setBackTime(nextTime);
    this.flipNode.classList.add('running');
    setTimeout(() => {
      this.flipNode.classList.remove('running');
      this.isFlipping = false;
      this.setFrontTime(nextTime);
    }, this.duration);
  }
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit {

  @ViewChild('clock', {static: true}) private clock: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const getTimeFromDate = (date: Date) =>
      date
        .toTimeString()
        .slice(0, 8)
        .split(':')
        .join('');

    const flips = document.querySelectorAll('.flip');
    let now = new Date();
    let nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
    let nextTimeStr = getTimeFromDate(now);
    const flippers = Array.from(flips).map(
      (flip, i) => new Flipper(flip, nowTimeStr[i], nextTimeStr[i])
    );

    observableInterval(1000).subscribe(() => {
      now = new Date();
      nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
      nextTimeStr = getTimeFromDate(now);
      for (let i = 0; i < flippers.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
          continue;
        }
        flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
      }
    });
  }
}
