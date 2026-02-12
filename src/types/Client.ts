export interface Client {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: string;
  updatedAt: string;
}
export interface Project {
  id: string;
  clientId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}
export interface Task {
  id: string;
  parent: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}
export interface ProjectWithTasks extends Project {
  tasks?: Task[];
}

export interface ClientWithFullData extends Client {
  projects?: ProjectWithTasks[];
}