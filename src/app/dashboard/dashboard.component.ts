import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,CommonModule,HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent { }
