import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { material } from '@core/material';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ...material],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
