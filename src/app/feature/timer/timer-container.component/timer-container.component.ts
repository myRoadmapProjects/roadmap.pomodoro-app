import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { CounterService } from '../../../core/service/counter.service';

export type TimerStatus = 'started' | 'paused' | 'stopped';

@Component({
  selector: 'zibug-timer-container',
  imports: [],
  templateUrl: './timer-container.component.html',
  styleUrl: './timer-container.component.css',

  standalone: true
})
export class TimerContainerComponent {

  protected counterService = inject(CounterService);
  private _timerStatus: WritableSignal<TimerStatus> = signal('stopped');
  protected timeLeft = signal(this.counterService.selectedTimer().value * 60);
  protected formattedTime: Signal<string> = computed(() => {
    const minutesLeft = Math.floor(this.timeLeft() / 60);
    const secondsLeft = Math.round(this.timeLeft() % 60);

    const formattedMinutes = String(minutesLeft).padStart(2,'0');
    const formattedSeconds = String(secondsLeft).padStart(2,'0');

    return `${formattedMinutes} : ${formattedSeconds}`;
  });

  protected timerId: any = null;

  constructor() {
    effect(() => {
      if(this.timerId != null) {
        clearInterval(this.timerId);
        this.timerId = null;
      }

      if(this._timerStatus() === 'started') {
        this.updateTimeLeft();
        return;
      }
      clearInterval(this.timerId);
      if(this._timerStatus() === 'stopped') this.timeLeft.set(this.counterService.selectedTimer().value * 60);
    })
  }

  set timerStatus(status: string) {
    this._timerStatus.set(status as TimerStatus);
  }

  get timerStatus(): Signal<TimerStatus> {
    return this._timerStatus.asReadonly();
  }

  updateTimeLeft() {
    this.timerId = setInterval(() => {
      if(this.timeLeft() == 0) {
        clearInterval(this.timerId);
        this.timerId = null;
        return;
      };
      this.timeLeft.update(curr => curr - 1);
    }, 1000)
  }

  handleChangeSelectedTimer(idx: number) {
    this.counterService.selectedTimer = idx;
  }

  handleChangeSelectedTimerStatus(timerStatus: string) {
    this.timerStatus = timerStatus
  }

  selectedTimerInset(selectedValue: number) {
    return this.counterService.selectedTimer().value === selectedValue ? ' inset-shadow-red-900 inset-shadow-sm' : '';
  }

  selectedStatusInset(timerStatus: string) {
    return this.timerStatus() === timerStatus ? ' inset-shadow-gray-900 inset-shadow-sm' : '';
  }
}

