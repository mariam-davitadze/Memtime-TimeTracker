import { Task } from "./Task";
export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "completed" | "in-progress" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithTasks extends Project {
  tasks?: Task[];
}
