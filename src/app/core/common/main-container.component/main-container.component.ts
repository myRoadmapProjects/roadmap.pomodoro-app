import { Component } from '@angular/core';
import { TimerContainerComponent } from '../../../feature/timer/timer-container.component/timer-container.component';
import { TasksContainerComponent } from '../../../feature/tasks/tasks-container.component/tasks-container.component';

@Component({
  selector: 'zibug-main-container',
  imports: [
    TimerContainerComponent,
    TasksContainerComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css',
  standalone: true
})
export class MainContainerComponent {}
