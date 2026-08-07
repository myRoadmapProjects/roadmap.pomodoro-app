import { Service, Signal, signal, WritableSignal } from '@angular/core';
import TimerModel from '../models/Timer.model';

@Service()
export class CounterService {
  public timerValues: TimerModel[] = [
    {
      label: "Work",
      value: 25
    },
    {
      label: "Short Break",
      value: 5
    },
    {
      label: "Long Break",
      value: 15
    },
  ]
  // public counter: WritableSignal<TimerModel> = signal(this.timerValues[0])
  private _selectedTimer: WritableSignal<TimerModel> = signal(this.timerValues[0]);

  get selectedTimer(): Signal<TimerModel> {
    return this._selectedTimer.asReadonly();
  }

  set selectedTimer(idx: number) {
    this._selectedTimer.set(this.timerValues[idx]);
  }

}
