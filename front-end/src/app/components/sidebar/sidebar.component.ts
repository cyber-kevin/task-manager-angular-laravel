import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() task: Task | null = null;
  @Output() taskCreated = new EventEmitter<any>();

  newTask = {
    title: '',
    description: '',
    status: 'todo' as 'todo' | 'doing' | 'done' | 'pending',
    end_date: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      if (this.task) {
        this.newTask = { ...this.task };
      } else {
        this.newTask = {
          title: '',
          description: '',
          status: 'todo',
          end_date: ''
        };
      }
    }
  }

  onSubmit() {
    const formattedDateTime = this.formatDate(this.newTask.end_date);

    this.taskCreated.emit({ ...this.newTask });

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
