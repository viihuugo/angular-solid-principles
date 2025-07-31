import { Component } from '@angular/core';
import { Toolbar } from "./components/toolbar/toolbar";
import { Widget } from "./components/widget/widget";

@Component({
  selector: 'app-root',
  imports: [Toolbar, Widget],
  template: `
    <app-toolbar></app-toolbar>
    <main>
      <app-widget></app-widget>
    </main>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'solid-principles';
}
