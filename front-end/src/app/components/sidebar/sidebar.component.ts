import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() taskCreated = new EventEmitter<any>();

  newTask = {
    title: '',
    description: '',
    status: 'todo' as 'todo' | 'in-progress' | 'done' | 'pending',
    end_date: '',
  };

  onSubmit() {
    const formattedDateTime = this.formatDate(this.newTask.end_date);

    this.taskCreated.emit({
      ...this.newTask,
    });

    this.newTask = {
      title: '',
      description: '',
      status: 'todo',
      end_date: ''
    };
  }

  formatDate(dateTime: string): string {
    if (!dateTime) return '';
    const [date, time] = dateTime.split('T');
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year} ${time}`;
  }
}
