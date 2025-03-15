import { Injectable } from '@angular/core';
import { Task } from '../../app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1,
      title: 'Write blog on JS array',
      status: 'todo',
      description: 'teste',
      owner: 'teste',
      due_date: 'teste',
      created_at: 'teste',
      deleted_at: 'teste',
      completed: false,
    },
    { 
      id: 2,
      title: 'Learn Angular',
      status: 'todo',
      description: 'teste',
      owner: 'teste',
      due_date: 'teste',
      created_at: 'teste',
      deleted_at: 'teste',
      completed: true,
    },
    { 
      id: 3,
      title: 'Write blog on JS array',
      status: 'todo',
      description: 'teste',
      owner: 'teste',
      due_date: 'teste',
      created_at: 'teste',
      deleted_at: 'teste',
      completed: true,
    },
  ];

  getTasksByStatus(status: Task['status']) {
    return this.tasks.filter(task => task.status === status);
  }

  addTask(task: Omit<Task, 'id'>) {
    const newTask = { ...task, id: this.tasks.length + 1 };
    this.tasks.push(newTask);
  }
}