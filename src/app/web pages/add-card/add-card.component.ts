import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.css',
})
export class AddCardComponent {
  ui = inject(UiService);
  darkMode$ = this.ui.darkModeState.pipe(takeUntilDestroyed());
}
