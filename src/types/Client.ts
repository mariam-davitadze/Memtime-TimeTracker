import { ProjectWithTasks } from "./Project";

export interface Client {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: string;
  updatedAt: string;
}
export interface ClientWithFullData extends Client {
  projects?: ProjectWithTasks[];
}