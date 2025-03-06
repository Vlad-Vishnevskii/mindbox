export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export enum TabsEnum {
    all = 'all',
    active = 'active',
    completed = 'completed'
}

