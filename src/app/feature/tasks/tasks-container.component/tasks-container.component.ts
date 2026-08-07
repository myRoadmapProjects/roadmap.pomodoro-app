import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { Task } from '../../../core/models/Tasks.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'zibug-tasks-container',
  imports: [FormsModule,NgIcon],
  templateUrl: './tasks-container.component.html',
  styleUrl: './tasks-container.component.css',
  standalone: true,
  viewProviders: [provideIcons({lucidePlus})]
})
export class TasksContainerComponent {
  protected tasks: WritableSignal<Task[]> = signal([]);
  protected _taskToAdd = signal("");

  set taskToAdd(taskName: string) {
    this._taskToAdd.set(taskName);
    console.log(taskName);
  }

  get taskToAdd(): string {
    return this._taskToAdd.asReadonly()();
  }

  handleInputChange($event: Event) {
    console.log($event)
  }

  addTask() {
    if(!this.taskToAdd || this.taskToAdd.trim() === "") return;
    this.tasks.update(curr => [...curr, {name: this.taskToAdd, status: 'todo'}])
    this.taskToAdd = "";
  }
}
