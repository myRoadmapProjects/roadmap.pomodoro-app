import { Component } from '@angular/core';
import { TimerContainerComponent } from '../../../feature/timer/timer-container.component/timer-container.component';

@Component({
  selector: 'zibug-main-container',
  imports: [
    TimerContainerComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css',
  standalone: true
})
export class MainContainerComponent {}
