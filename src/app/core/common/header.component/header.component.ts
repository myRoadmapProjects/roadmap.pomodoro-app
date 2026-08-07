import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSettings } from '@ng-icons/lucide';

@Component({
  selector: 'zibug-header',
  imports: [NgIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [provideIcons({lucideSettings})],
  standalone: true
})
export class HeaderComponent {}
