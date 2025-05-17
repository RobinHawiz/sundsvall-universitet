import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

type Mode = 'dark' | 'light';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoSrc = signal('');

  ngOnInit() {
    this.setInitLogoMode();
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const mode = event.matches ? 'dark' : 'light';
        this.toggleLogoMode(mode);
      });
  }

  setInitLogoMode() {
    const mode = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    this.toggleLogoMode(mode);
  }

  toggleLogoMode(mode: Mode): void {
    this.logoSrc.set(
      mode === 'dark'
        ? 'sundsvall_universitet_logga_light.svg'
        : 'sundsvall_universitet_logga_dark.svg'
    );
  }
}
