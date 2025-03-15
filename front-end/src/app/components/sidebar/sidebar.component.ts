import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  newTask = {
    title: '',
    description: '',
    status: 'todo' as 'todo' | 'in-progress' | 'done' | 'pending'
  };

  onSubmit() {
    console.log('Nova Tarefa:', this.newTask);
    this.newTask = {
      title: '',
      description: '',
      status: 'todo'
    };
  }
}
