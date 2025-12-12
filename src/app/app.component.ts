import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `
    <main class="layout">
      <h1 class="title">Gestione Personale Medico</h1>
      <router-outlet />
    </main>
  `,
  styles: [
    `
      .layout {
        padding: 2rem;
        max-width: 960px;
        margin-inline: auto;
      }

      .title {
        margin-block-end: 2rem;
        font-size: 1.75rem;
        font-weight: 600;
      }
    `,
  ],
})
export class AppComponent {}
