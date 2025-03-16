import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, MatIconModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);

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
      error: () => this.openNotification('Erro ao carregar tarefas')
    });
  }

  createTask(task: any): void {
    if (!this.areFieldsFilled(task)) {
      this.openNotification('Preencha todos os campos!', 2000);
      return
    }

    this.openNotification('Tarefa criada');

    this.apiService.createTask(task).subscribe({
      next: () => this.getTasks(),
      error: () => this.openNotification('Erro ao criar tarefa')
    });
  }

  updateTask(task: any): void {
    if (!this.areFieldsFilled(task)) {
      this.openNotification('Preencha todos os campos!', 2000);
      return
    }

    this.openNotification('Tarefa editada');

    this.closeEditing(task);
    this.apiService.updateTask(task.id, task).subscribe({
      next: () => this.getTasks(),
      error: () => this.openNotification('Erro ao editar tarefa')
    });
  }

  deleteTask(id: number): void {
    this.openNotification('Tarefa excluída');

    this.apiService.deleteTask(id).subscribe({
      next: () => this.getTasks(),
      error: () => this.openNotification('Erro ao excluir tarefa')
    });
  }

  countTasksByStatus(status: string): number {
    return this.tasks.filter(task => task.status === status).length;
  }  

  closeEditing(task: any): void {
    task.editingTitle= false;
    task.editingDescription = false;
  }

  openNotification(message: string, duration: number = 1000): void {
    this._snackBar.open(message, '', {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  areFieldsFilled(task: any) {
    return Object.values(task).every(value => value !== '');
  }
}