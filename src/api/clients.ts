import { api } from ".";

export const getClients = async () => {
  const response = await api.get('/clients');
  return response.data;
}

export const getClientProjects = async (clientId: string) => {
  const response = await api.get(`/clients/${clientId}/projects`);
  return response.data;
}

export const getProjectTasks = async (projectId: string) => {
  const response = await api.get(`/projects/${projectId}/tasks`);
  return response.data;
}