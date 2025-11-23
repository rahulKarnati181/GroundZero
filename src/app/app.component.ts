import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { FooterComponent } from './footer/footer';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Header,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
