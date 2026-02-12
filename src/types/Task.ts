export interface Task {
  id: string;
  name: string;
  description?: string;
  status: "completed" | "in-progress" | "pending";
  createdAt: string;
  updatedAt: string;
  projectId: string;
}
