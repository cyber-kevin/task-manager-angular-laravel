export interface Task {
  id: number;
  title: string;
  description: string;
  owner: string;
  due_date: string;
  created_at: string;
  deleted_at?: string;
  status: 'todo' | 'doing' | 'done' | 'pending';
  completed: boolean;
  editingTitle: boolean;
  editingDescription: boolean;
}