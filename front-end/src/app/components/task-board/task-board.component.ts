import { Component, OnInit, inject,  signal, TemplateRef, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, MatIconModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);
  private offcanvasService = inject(NgbOffcanvas);
	closeResult: WritableSignal<string> = signal('');
  currentUser: string | null = null;
  selectedTask: Task | null = null;

  tasks: any[] = [];

  columns = [
    { title: 'PARA FAZER', status: 'todo' as Task['status'] },
    { title: 'EM PROGRESSO', status: 'doing' as Task['status'] },
    { title: 'CONCLUÍDO', status: 'done' as Task['status'] },
    { title: 'ATRASADO', status: 'pending' as Task['status']},
  ];

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('email');
    this.getTasks();
  }

  open(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

  openEditSidebar(task: Task, content: TemplateRef<any>) {
    this.selectedTask = task;
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' });
  }

  openNewTaskSidebar(content: TemplateRef<any>) {
    this.selectedTask = null;
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' });
  }

  onTaskSaved(task: any) {
    console.log(task);
    task.id ? this.updateTask(task) : this.createTask(task);
    this.selectedTask = null;
  }

	private getDismissReason(reason: any): string {
		switch (reason) {
			case OffcanvasDismissReasons.ESC:
				return 'by pressing ESC';
			case OffcanvasDismissReasons.BACKDROP_CLICK:
				return 'by clicking on the backdrop';
			default:
				return `with: ${reason}`;
		}
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

  redirectToLogout() {
    this.openNotification('Saindo...')
    this.authService.logout();
  }
}