import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {
  columns = [
    { title: 'A FAZER', status: 'todo' as Task['status'] },
    { title: 'EM PROGRESSO', status: 'in-progress' as Task['status'] },
    { title: 'CONCLUÍDO', status: 'done' as Task['status'] },
    { title: 'ATRASADO', status: 'pending' as Task['status']},
  ];


  constructor(private taskService: TaskService) {}

  getTasks(status: Task['status']) {
    return this.taskService.getTasksByStatus(status);
  }

  updateTask(id: number, task: Partial<Task>) {
    
  }

  deleteTask(id: number) {
    
  }

  getTasksByUser(userId: number) {
    
  }

}