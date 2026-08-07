import { Component, effect, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRightFromLine, lucideBadgeQuestionMark, lucideCheck, lucideEdit, lucidePlus, lucideTrash, lucideMenu } from '@ng-icons/lucide';
import { Task } from '../../../core/models/Tasks.model';

@Component({
  selector: 'zibug-tasks-container',
  imports: [FormsModule,NgIcon],
  templateUrl: './tasks-container.component.html',
  styleUrl: './tasks-container.component.css',
  standalone: true,
  viewProviders: [provideIcons({
    lucidePlus,
    lucideCheck,
    lucideTrash,
    lucideEdit,
    lucideArrowRightFromLine,
    lucideBadgeQuestionMark,
    lucideMenu
  })]
})
export class TasksContainerComponent {



  loadTasksFromStorage() {
    const saved = localStorage.getItem('my_tasks');
    const parsedTask = saved ? JSON.parse(saved) : [];
    return parsedTask as Task[];
  }

  protected tasks: WritableSignal<Task[]> = signal(this.loadTasksFromStorage());
  protected _taskToAdd: WritableSignal<string> = signal("");
  protected selectedTask: WritableSignal<Task | null> = signal(null);
  protected selectedTaskToEdit: WritableSignal<number> = signal(-1);
  protected newEditedName: string = "";
  protected showLegend: WritableSignal<boolean> = signal(false);
  protected selectedDropDown:  WritableSignal<number> = signal(-1);

  constructor() {
    effect(() => {
      localStorage.setItem('my_tasks', JSON.stringify(this.tasks()));
    });
  }

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
    const newId = this.tasks().length + 1;
    this.tasks.update(curr => [...curr, {name: this.taskToAdd, status: 'todo', id: newId}])
    this.taskToAdd = "";
  }

  selectTask(task: Task) {
    if(task.status == 'done') return;
    this.selectedTask.set(task);
  }

  selectedTaskInset(task: Task) {
    const { id, status } = task;
    if(status == 'done') return;
    return this.selectedTask()?.id == id ? 'inset-shadow-sm inset-shadow-red-400' : 'shadow-md shadow-gray-400';
  }

  markAsCompleted(taskId: number) {
    this.tasks.update(prev => prev.map(t => (t.id == taskId ? {...t, status: t.status == 'done' ? 'todo' : 'done'} : t)));
  }

  confirmEdit(idx: number) {
    this.tasks.update(prev => prev.map(t => t.id != idx ? t : {...t, name: this.newEditedName}))
    if(this.selectedTask()?.id == idx) this.selectedTask.set(this.tasks().find(t => t.id == idx) ?? null);
    this.newEditedName = "";
    this.selectedTaskToEdit.set(-1);
  }

  deleteTask(idx: number) {
    this.selectedTaskToEdit.set(-1);
    this.selectedDropDown.set(-1);
    if(idx === this.selectedTask()?.id) this.selectedTask.set(null);
    this.tasks.update(prev => {
      const result = prev.map(t => t.id != idx ? t : null).filter(t => !!t)
      result.forEach((el, idx) => el.id = idx);
      return result;
    });
  }

  handleClickSelectedDropdown(idx: number) {
    this.selectedDropDown.set(task.id);
  }

  showDropdown(idx: number) {
    return this.selectedDropDown() == idx ? 'grid' : 'hidden';
  }
}
