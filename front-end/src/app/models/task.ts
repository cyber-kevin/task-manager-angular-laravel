export interface Task {
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done' | 'pending';
  end_date: string;
}