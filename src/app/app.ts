import { Component, inject, WritableSignal } from '@angular/core';
import { TitleService } from './core/service/title.service';
import { HeaderComponent } from './core/common/header.component/header.component';
import { MainContainerComponent } from './core/common/main-container.component/main-container.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MainContainerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private titleService = inject(TitleService);
  protected readonly title: WritableSignal<string> = this.titleService.title;
}
