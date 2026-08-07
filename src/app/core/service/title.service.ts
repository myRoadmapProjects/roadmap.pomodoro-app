import { effect, inject, Service, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Service()
export class TitleService {
  private titleNgService = inject(Title);

  public title = signal("pommidoro");

  constructor() {
    effect(() => {
      this.titleNgService.setTitle(this.title());
    })
  }
}
