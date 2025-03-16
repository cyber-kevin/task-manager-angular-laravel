import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, MatIconModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit{
  tasks: any[] = [];

  columns = [
    { title: 'A FAZER', status: 'todo' as Task['status'] },
    { title: 'EM PROGRESSO', status: 'doing' as Task['status'] },
    { title: 'CONCLUÍDO', status: 'done' as Task['status'] },
    { title: 'ATRASADO', status: 'pending' as Task['status']},
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.apiService.getTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  createTask(task: any): void {
    this.apiService.createTask(task).subscribe({
      next: () => this.getTasks(),
      error: (err) => console.error('Error creating task', err)
    });
  }

  updateTask(task: any): void {
    this.closeEditing(task);
    this.apiService.updateTask(task.id, task).subscribe({
      next: () => this.getTasks(),
      error: (err) => console.error('Error updating task', err)
    });
  }

  deleteTask(id: number): void {
    this.apiService.deleteTask(id).subscribe({
      next: () => this.getTasks(),
      error: (err) => console.error('Error deleting task', err)
    });
  }

  countTasksByStatus(status: string): number {
    return this.tasks.filter(task => task.status === status).length;
  }  

  closeEditing(task: any): void {
    task.editingTitle= false;
    task.editingDescription = false;
  }
}