import { Component } from '@angular/core';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TaskBoardComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
